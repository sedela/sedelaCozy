# Sedela initial prototype
Providing a reflective writing environment

Based on [Cozy cloud development environment](https://docs.cozy.io/en/dev/app/) 

To install an test:

```
git clone https://github.com/sedela/sedela
cd sedela
yarn install
yarn build
sudo docker run --rm -it -p 8080:8080 -v "$(pwd)/dist":/data/cozy-app/sedelaproto cozy/cozy-app-dev

```
The default password is `cozy`
