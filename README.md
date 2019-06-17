# Ticket Booking


## Installation



```bash
npm install
```
## Run(Server and woker)



```bash
npm start
```
## Usage(Steps)

```python
After running the server and worker
Following end points should be called

1:localhost:3024/insert?movie=Avengers&hall=12
2:localhost:3024/enquire?movie=Avengers
3:localhost:3024/bookSeats?noofseats=30&enquireid=5546908374
4:localhost:3024/processPayment?enquireid=5546908374
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
