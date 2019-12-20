# Hackoverflow API Documentation

Dokumentasi RESTFUL API hackoverflow.

## Base URL

```http
http://api.hackoverflow.prograami.com/
```

## List Endpoint

### Users

#### Register

```http
POST /users
```

Digunakan untuk registrasi user

##### Request Body

| Key      | Tipe Data | Required | Keterangan                  |
| -------- | --------- | -------- | --------------------------- |
| displayName     | string    | true     			|           |
| email    | string    | true     | Alamat Email  |
| password | string    | true     | Password minimal 6 karakter |

##### Response

```http
HTTP STATUS CODE: 201
```

```json
{
    "code": 201,
    "status": "success",
    "user": {
        "_id": "jas9bh39sjasbd.....",
        "name": "JhonDoe",
        "email": "JhonDoe@email.com"
    }
}
```

------

#### Login

```http
POST /users/user/login
```

Digunakan untuk login user

##### Request Body

| Key      | Tipe Data | Required | Keterangan                  |
| -------- | --------- | -------- | --------------------------- |
| email    | string    | true     | Alamat Email Administrator  |
| password | string    | true     | Password minimal 6 karakter |

##### Response

```http
HTTP STATUS CODE: 200
```

```json
{
    "code": 200,
    "status": "success",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ...."
}
```

------