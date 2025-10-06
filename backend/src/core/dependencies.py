from typing import Annotated, Any, AsyncGenerator
from fastapi import Cookie, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from schemas.user import UserRole
from db.models import User
from db.database import AsyncSessionLocal
from core.security import SECRET_KEY, ALGORITHM
from sqlalchemy import select

current_user_responses: dict[int | str, dict[str, Any]] = {
    status.HTTP_401_UNAUTHORIZED: {
        "description": "Missing or invalid authentication credentials",
        "content": {
            "application/json": {
                "example": {"detail": "Could not validate credentials"}
            }
        }
    }
}

async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """Async database session dependency"""
    async with AsyncSessionLocal() as session:
        try:
            yield session
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()



async def get_current_user(
    access_token: Annotated[str | None, Cookie(alias="access_token")] = None,
    db: AsyncSession = Depends(get_db)
) -> User:
    print(f"Access token received: {access_token is not None}")  # Debug
    
    if access_token is None:
        print("No access token found in cookies")  # Debug
        raise HTTPException(status_code=401, detail="Not authenticated")

    try:
        payload = jwt.decode(access_token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str | None = payload.get("sub")
        print(f"Username from token: {username}")  # Debug
        
        if not username:
            raise HTTPException(status_code=401, detail="Invalid token")
        
        # Use async query
        result = await db.execute(
            select(User).where(User.user_username == username)
        )
        user = result.scalar_one_or_none()
        
        if not user:
            print(f"User {username} not found in database")  # Debug
            raise HTTPException(status_code=401, detail="User not found")
        
        print(f"User found: {user.user_username}, Role: {user.user_role}")  # Debug
        return user
        
    except JWTError as e:
        print(f"JWT Error: {e}")  # Debug
        raise HTTPException(status_code=401, detail="Invalid token")


async def get_current_admin_user(current_user: User = Depends(get_current_user)):
    if current_user.user_role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return current_user