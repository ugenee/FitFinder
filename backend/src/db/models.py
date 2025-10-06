from sqlalchemy import Boolean, Enum, Integer, String
from sqlalchemy.orm import declarative_base, Mapped, mapped_column
from sqlalchemy.dialects.mysql import TINYINT

from schemas.user import Gender

Base = declarative_base()

class User(Base):
    __tablename__ = "t_user"

    user_id: Mapped[int] = mapped_column(
        Integer, primary_key=True, autoincrement=True)
    user_age: Mapped[int] = mapped_column(
        TINYINT(unsigned=True), nullable=False)
    user_gender: Mapped[Gender] = mapped_column(
        Enum(Gender), nullable=False)
    user_email: Mapped[str] = mapped_column(
        String(100), unique=True, nullable=False)
    user_username: Mapped[str] = mapped_column(
        String(50), unique=True, nullable=False)
    user_password: Mapped[str] = mapped_column(String(150), nullable=False)
   
class Places(Base):
    __tablename__ = "t_places"
    id : Mapped[int] = mapped_column(
        Integer, primary_key=True, autoincrement=True
    )
    places_id : Mapped[str] = mapped_column(
        String(50), unique=True, nullable=False
    )
    walk_in : Mapped[bool] = mapped_column(
        Boolean, default=True, nullable=False
    )