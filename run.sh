cd Frontend
yarn dev &
FRONT_PID=$!

cd ../Backend
yarn dev &
BACKEND_PID=$!

cd ../BackendGL
go run . &
GO_PID=$!

trap "kill $FRONT_PID $BACKEND_PID $GO_PID" EXIT
wait