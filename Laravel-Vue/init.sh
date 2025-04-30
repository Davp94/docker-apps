echo "LEVANTANDO CONTENEDORES DE (DOCKER)"
cd backend_laravel
docker compose up -d --build

docker compose exec -t backend composer install
docker compose exec -t backend php artisan key:generate
docker compose exec -t backend php artisan optimize
docker compose exec -t backend php artisan migrate:fresh
docker compose exec -t backend php artisan db:seed

echo "Completed execution"
