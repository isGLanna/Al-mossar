# Install dependencies
echo "[run-prod] Installing dependencies..."
npm ci

# Build the project
echo "[run-prod] Building the project..."
npm run build

# Run database migrations
echo "[run-prod] Running database migrations..."
npm run migrate
