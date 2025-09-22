from typing import Annotated, Any
from fastapi import Cookie, Depends, HTTPException, status
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from db.models import User
from db.database import SessionLocal
from core.security import SECRET_KEY, ALGORITHM

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

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

async def get_current_user(
    access_token: Annotated[str | None, Cookie(alias="access_token")] = None,
    db: Session = Depends(get_db)
) -> User:
    if access_token is None:
        raise HTTPException(status_code=401, detail="Not authenticated")

    try:
        payload = jwt.decode(access_token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str | None = payload.get("sub")
        if not username:
            raise HTTPException(status_code=401, detail="Invalid token")
        user = db.query(User).filter(User.user_username == username).first()
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
