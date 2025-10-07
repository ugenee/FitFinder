from datetime import timedelta
from fastapi import APIRouter, Depends, Response, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from src.core.security import (
    ACCESS_TOKEN_EXPIRES_MINUTES,
    create_access_token,
    get_password_hash,
    verify_password,
)
from src.db.models import User
from src.core.dependencies import get_db
from src.schemas.user import UserCreate, UserWithToken

router = APIRouter(prefix="/auth", tags=["auth"])


def set_cookie(response: Response, access_token: str):
    """Helper to set secure cookie"""
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=True,  # Change to True in HTTPS
        max_age=ACCESS_TOKEN_EXPIRES_MINUTES * 60,
        samesite="none",
        path="/",
    )


@router.post("/register", response_model=UserWithToken)
async def register(
    user: UserCreate,
    response: Response,
    db: AsyncSession = Depends(get_db)
):
    """Register a new user asynchronously"""
    # Check if user already exists
    result = await db.execute(
        select(User).where(
            (User.user_email == user.user_email) |
            (User.user_username == user.user_username)
        )
    )
    existing_user = result.scalar_one_or_none()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail=[{"msg": "Username or email already registered"}]
        )

    # Hash and create new user
    hashed_password = get_password_hash(user.user_password)
    new_user = User(
        user_username=user.user_username,
        user_password=hashed_password,
        user_email=user.user_email,
        user_age=user.user_age,
        user_gender=user.user_gender,
        user_role = user.user_role
    )

    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)

    # Generate JWT
    access_token = create_access_token(
        data={"sub": new_user.user_username},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRES_MINUTES),
    )

    set_cookie(response, access_token)

    return UserWithToken(
        user_id=new_user.user_id,
        user_username=new_user.user_username,
        user_email=new_user.user_email,
        access_token=access_token,
        user_role=new_user.user_role,
        token_type="bearer",
    )


@router.post("/login")
async def login(
    response: Response,
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: AsyncSession = Depends(get_db)
):
    """Login user asynchronously"""
    result = await db.execute(
        select(User).where(User.user_username == form_data.username)
    )
    user = result.scalar_one_or_none()

    if not user or not verify_password(form_data.password, user.user_password):
        raise HTTPException(
            status_code=401,
            detail=[{"msg": "Incorrect username or password"}]
        )

    # Create JWT token
    access_token = create_access_token(
        data={"sub": user.user_username},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRES_MINUTES),
    )

    set_cookie(response, access_token)
    return {"message": "Login successful"}


@router.post("/logout")
async def logout(response: Response):
    """Logout user by deleting cookie"""
    response.delete_cookie(
        key="access_token",
        httponly=True,
        secure=True,
        samesite="none",
        path="/",
    )
    return {"message": "Logout successful"}

