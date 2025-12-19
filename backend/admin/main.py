from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import init_db
from routes.auth_routes import router as auth_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    try:
        init_db()
        print("✓ Database initialized successfully")
    except Exception as e:
        print(f"⚠ Database connection failed: {e}")
        print("⚠ Server will run but auth endpoints require database connection")
    
    yield
    
    # Shutdown (add cleanup code here if needed)

app = FastAPI(title="Admin API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # your React dev URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router)

@app.get("/health")
def health():
    return {"ok": True}
