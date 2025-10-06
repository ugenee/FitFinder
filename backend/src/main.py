from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import places, user, auth
from core.config import settings
from contextlib import asynccontextmanager
from db.models import Base
from db.database import engine
@asynccontextmanager
async def lifespan(app: FastAPI):

    if not settings.SECRET_KEY:
        raise RuntimeError("SECRET_KEY must be set in environment")

    if not settings.DATABASE_URL:
        raise RuntimeError("DATABASE_URL must be set in environment")
    
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    yield

app = FastAPI(lifespan=lifespan)
origins = ["http://localhost:5173", "http://localhost:8000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(user.router)
app.include_router(places.router)
