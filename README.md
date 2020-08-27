# BBank

Bank API with Node and Mongodb

## Installation

```bash
npm i
```

## Usage

```bash
npm start 
```

Open a terminal or a postman and try something at [http://localhost:8000/](http://localhost:8000/)


## Running tests

```bash
npm test
```

## Services

### Create banking account service

```sh
curl --location --request POST 'http://localhost:8000/account/client' \
--header 'Content-Type: application/json' \
--data-raw '{
    "fullName": "Maria Andrade Pires",
    "document": "123.456.456-81",
    "email": "maria01@email.com"
}'
```

```json
{
    "fullName": "Maria Andrade Pires",
    "email": "maria01@email.com",
    "branchNumber": "0001",
    "fullAccountNumber": "935372-0",
    "avaliableBalance": 0
}
```

### Made a deposit operation service

```sh
curl --location --request POST 'http://localhost:8000/account/deposit' \
--header 'Content-Type: application/json' \
--data-raw '{
    "depositType": "DOC",
    "value": 335.45,
    "branchNumber": "0001",
    "fullAccountNumber": "935372-0",
    "payingSource": {
        "bankName": "Banco Raiz",
        "bankNumber": "123",
        "branchNumber": "2345",
        "fullAccountNumber": "654321-0",
        "clientName": "José Maria Silva"
    }
}'
```

```json
{
    "transactionType": "DP",
    "value": 335.45,
    "actionType": "A",
    "labelDescription": "José Maria Silva | Banco Raiz",
    "branchNumber": "0001",
    "fullAccountNumber": "935372-0",
    "operation": {
        "payingSource": {
            "bankName": "Banco Raiz",
            "bankNumber": "123",
            "branchNumber": "2345",
            "fullAccountNumber": "654321-0",
            "clientName": "José Maria Silva"
        },
        "depositType": "DOC"
    },
    "date": "27/08/2020 13:10:03"
}
```

### Made a withdraw operation service

```sh
curl --location --request POST 'http://localhost:8000/account/withdraw' \
--header 'Content-Type: application/json' \
--data-raw '{
    "value": 100.55,
    "branchNumber": "0001",
    "fullAccountNumber": "935372-0",
    "financialInstitution": {
        "companyName": "Banco 24 Horas",
        "cnpj": "24.363.105/0001-73"
    }
}'
```

```json
{
    "transactionType": "WD",
    "value": 100.55,
    "actionType": "D",
    "labelDescription": "Banco 24 Horas",
    "branchNumber": "0001",
    "fullAccountNumber": "935372-0",
    "operation": {
        "financialInstitution": {
            "companyName": "Banco 24 Horas",
            "cnpj": "24.363.105/0001-73"
        }
    },
    "date": "27/08/2020 13:13:41"
}
```

# References

Integration tests: https://github.com/pawap90/test-mongoose-inmemory

