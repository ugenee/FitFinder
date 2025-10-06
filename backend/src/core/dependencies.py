from typing import Annotated, Any, AsyncGenerator
from fastapi import Cookie, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session
from jose import jwt, JWTError
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
    if access_token is None:
        raise HTTPException(status_code=401, detail="Not authenticated")

    try:
        payload = jwt.decode(access_token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str | None = payload.get("sub")
        if not username:
            raise HTTPException(status_code=401, detail="Invalid token")
        
        # Use async query with SQLAlchemy 2.0 style
        result = await db.execute(
            select(User).where(User.user_username == username)
        )
        user = result.scalar_one_or_none()
        
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
