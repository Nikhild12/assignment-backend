docker pull public.ecr.aws/m3v8t2s4/nikhil-backend:latest
docker container rm -f nikhil-backend
docker run -dp 3000:3000 --name  nikhil-backend ubuntu