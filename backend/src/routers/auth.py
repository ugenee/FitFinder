from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from core.security import ACCESS_TOKEN_EXPIRES_MINUTES, create_access_token, get_password_hash
from db.models import User
from core.dependencies import get_db
from schemas.user import UserCreate, UserWithToken


router = APIRouter(prefix="/auth", tags=["auth"])


def set_cookie(response: Response, access_token: str):
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=False,  # set to True if running HTTPS
        max_age=ACCESS_TOKEN_EXPIRES_MINUTES * 60,
        samesite="lax",
    )



@router.post("/register")
def register(
    response: Response, user: UserCreate, db: Session = Depends(get_db)
) -> UserWithToken:
    existing_user = db.query(User).filter(
        (User.user_email == user.user_email) |
        (User.user_username == user.user_username)
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username, email, or phone already registered"
        )
    
    hashed_password = get_password_hash(user.user_password)

    new_user = User(
        user_username = user.user_username,
        user_password = hashed_password,
        user_age =  user.user_age,
        user_email = user.user_email,
        user_gender = user.user_gender
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    access_token = create_access_token(
        data={"sub": new_user.user_username}, expires_delta = timedelta(minutes=ACCESS_TOKEN_EXPIRES_MINUTES)
    )

    set_cookie(response, access_token)

    return UserWithToken(
        user_id = new_user.user_id,
        user_username= new_user.user_username,
        user_email = new_user.user_email,
        access_token = access_token,
        token_type = "bearer"

    )