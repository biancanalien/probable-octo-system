# BBank

Bank API with Node and Mongodb

## Installation

```bash
npm i
```

## Usage

Create a `.env` with the Mongodb variables like `.env.example`

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
curl --location --request POST 'http://localhost:8000/api/v1/account/new' \
--header 'Content-Type: application/json' \
--data-raw '{
    "fullName": "Cintia Carvalho",
    "document": "456.123.456-78",
    "email": "cintia@email.com"
}'
```

```json
{
    "fullName":"Cintia Carvalho",
    "email":"cintia@email.com",
    "branchNumber":"0001",
    "fullAccountNumber":"845713-0",
    "availableBalance":0
}
```

### Made a deposit operation service

```sh
curl --location --request POST 'http://localhost:8000/api/v1/operation/deposit' \
--header 'Authorization: fakeToken&543190-0&0001' \
--header 'Content-Type: application/json' \
--data-raw '{
    "depositType": "DOC",
    "value": "145.58",
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
    "currentTransaction": {
        "transactionType": "DP",
        "value": "R$ 145,58",
        "actionType": "A",
        "labelDescription": "José Maria Silva | Banco Raiz",
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
        "date": "28/08/2020 15:35:47"
    },
    "currentBankingAccount": {
        "branchNumber": "0001",
        "fullAccountNumber": "543190-0",
        "availableBalance": "R$ 2.674,61"
    }
}
```

### Made a withdraw operation service

```sh
curl --location --request POST 'http://localhost:8000/api/v1/operation/withdraw' \
--header 'Authorization: fakeToken&543190-0&0001' \
--header 'Content-Type: application/json' \
--data-raw '{
    "value": "100.55",
    "financialInstitution": {
        "companyName": "Banco 24 Horas",
        "cnpj": "24.363.105/0001-73"
    }
}'
```

```json
{
    "currentTransaction": {
        "transactionType": "WD",
        "value": "R$ 100,55",
        "actionType": "D",
        "labelDescription": "Banco 24 Horas",
        "operation": {
            "financialInstitution": {
                "companyName": "Banco 24 Horas",
                "cnpj": "24.363.105/0001-73"
            }
        },
        "date": "28/08/2020 15:37:22"
    },
    "currentBankingAccount": {
        "branchNumber": "0001",
        "fullAccountNumber": "543190-0",
        "availableBalance": "R$ 2.574,06"
    }
}
```

### Get bank-statement 

```sh
curl --location --request GET 'http://localhost:8000/api/v1/bank-statement' \
--header 'Authorization: fakeToken&543190-0&0001'

# next page

curl --location --request GET 'http://localhost:8000/api/v1/bank-statement?page=2' \
--header 'Authorization: fakeToken&543190-0&0001'
```

```json
{
    "bankStatementResult": [
        {
            "transactionType": "DP",
            "value": "R$ 335,45",
            "actionType": "A",
            "labelDescription": "José Maria Silva | Banco Raiz",
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
            "date": "27/08/2020 17:23:35"
        }
    ],
    "currentBankingAccount": {
        "branchNumber": "0001",
        "fullAccountNumber": "543190-0",
        "availableBalance": "R$ 2.473,51"
    }
}
```

# References

Integration tests: https://github.com/pawap90/test-mongoose-inmemory

