sudo docker push public.ecr.aws/m3v8t2s4/nikhil-backend:latest
sudo docker rm -f nikhil-backend
sudo docker run -dp 3000:3000 --name nikhil-backend ubuntu