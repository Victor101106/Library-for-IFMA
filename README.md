<img alt="Bookshelf" src="public/images/readme-banner.jpg">

<h1 align="center">
    📖 Library for IFMA
</h1>

<p align="center">
    Web application for management and access control to the library of Instituto Federal do Maranhão - Campus Avançado Porto Franco.
</p>

<div align="center">
    <img alt="NodeJS badge"             src="https://img.shields.io/badge/Node.js-5FA04E.svg?style=for-the-badge&logo=nodedotjs&logoColor=white">
    <img alt="JavaScript badge"         src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black">
    <img alt="TypeScript badge"         src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white">
    <img alt="Fastify badge"            src="https://img.shields.io/badge/Fastify-000000.svg?style=for-the-badge&logo=Fastify&logoColor=white">
    <img alt="Zod badge"                src="https://img.shields.io/badge/Zod-3E67B1.svg?style=for-the-badge&logo=Zod&logoColor=white">
    <img alt="Convetional Commit badge" src="https://img.shields.io/badge/Conventional%20Commits-FE5196.svg?style=for-the-badge&logo=Conventional-Commits&logoColor=white">
</div>

##

## Content Table
- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Features](#features)
- [Environment Variables](#environment-variables)
- [Conventional Commits](#conventional-commits)
- [Result Pattern](#result-pattern)
- [RBAC - Roles and Permissions](#rbac---role-based-access-control)
- [License](#license)
- [Contact](#contact)

## Requirements

1. `NodeJS v20.x`.

## Getting Started

Follow the step-by-step instructions to set up and run the project:

1. Clone the repository:

    ```bash
    git clone https://github.com/Victor101106/Library-for-IFMA.git
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Configure environment variables:

    - Copy `.env.example` file and rename it to `.env`:

        ```bash
        cp .env.example .env
        ```

    - Update the `.env` file with the required values. Refer to the [Environment Variables](#environment-variables) for details.

4. Run the project in development mode:

    ```bash
    npm run start:dev
    ```

## Features

### User Authentication

- [x] It should allow users to initiate sign up using Google OAuth2;
- [x] It should aloow users to complete sign up by providing a registration for students or SIAPE for employees;
- [x] It should allow users to log in using Google OAuth2.

### Book Loans

- [ ] It should allow users to add books to a cart;
- [ ] It should allow users to review selected books;
- [ ] It should allow users to choose loan options, including a return date (maximum of one week);
- [ ] It should allow users to choose pickup and return time slots (morning: 08:00-12:00; afternoon: 14:00-18:00);
- [ ] It should allow users to renew loans if more time is needed to finish reading a book;
- [ ] It should allow users to reserve books that are currently loaned out;
- [ ] It should prioritize reservations based on the first user to reserve the book.

### Book Search

- [ ] It should allow users to search for books using keywords;
- [ ] It should allow users to search for books using categories;
- [ ] It should allow users to filter books by book code, title, author, genre, or subject.

### Email Notifications

- [ ] It should send a confirmation email to users upon successful loan creation, including the return date and time;
- [ ] It should send reminder emails to users two days before the return deadline;
- [ ] It should send reminder emails to users one day before the return deadline;
- [ ] It should send notifications to administrators about overdue returns;
- [ ] It should send notifications to administrators about completed returns;
- [ ] It should send notifications to administrators about loan renewals.

### Stock Management

- [ ] It should allow administrators to add books to the inventory;
- [ ] It should allow administrators to update book details in the inventory;
- [ ] It should allow administrators to delete books from the inventory;
- [ ] It should allow administrators to track the quantity of each book in the inventory.

### Access Control

- [ ] It should implement different access levels for administrators;
- [ ] It should implement different access levels for employees;
- [ ] It should implement different access levels for students.

### Reporting

- [ ] It should allow administrators to generate reports about completed loans;
- [ ] It should allow administrators to generate reports about pending loans;
- [ ] It should allow administrators to generate reports about the stock status;
- [ ] It should allow administrators to generate reports about overdue returns.

## Environment Variables

To run the project correctly, you must set the required environment variables. Create a `.env` file in the root directory based on the `.env.example` file. Below is a description of the required variables:

| Variable                       | Description                                               | Example Value                         |
|--------------------------------|-----------------------------------------------------------|---------------------------------------|
| `ACCESS_TOKEN_SECRET_KEY`      | Secret key used to sign access tokens                     | `your-access-token-secret-key`        |
| `GOOGLE_CLIENT_SECRET_KEY`     | Secret key used for authenticating with Google APIs       | `your-google-secret-key`              |
| `GOOGLE_REDIRECT_URI`          | The URI where Google redirects users after authentication | `http://localhost:3030/auth/callback` |
| `GOOGLE_CLIENT_ID`             | Unique identifier for your Google API client	             | `your-google-client-id`               |
| `PORT`                         | The port where the server will listen                     | `3030`                                |

## Conventional Commits

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification to maintain a clean and consistent commit history.

### Commitizen: How to Use

1. Stage your changes:

    ```bash
    git add [<pathspec>...]
    ```

2. Commit using `Commitizen`:

    ```bash
    npm run git:commit
    ```

3. Follow the interactive prompts.
    `Commitizen` will guide you through crafting a proper commit message.

### Message Structure

The commit message should be structured as follows:

```bash
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Example:
```bash
feat(auth): add login functionality
```

## Result Pattern

This project uses the **Go-based Result Pattern** to manage type-safe operation results. The `Result` type provides a type-safe way to handle both successful and failed operations.

### Defining `Result`

To define a result, use the generic type `Result<F, S>`, where:
- `F`: represents the type of the failure (failed result).
- `S`: represents the type of the success (successful result).

#### Example:

Below is an example of a division function. If the operation fails (e.g., division by zero), the result contains a DivisionByZeroError. Otherwise, it contains a number.

```ts
function divide(dividend: number, divisor: number): Result<DivisionByZeroError, number> {
    // Implementation goes here
}
```

### Returning `Result`

To return a result, use:
- `failure(F)`: for failed outcomes, passing the result value (`F`).
- `success(S)`: for successful outcomes, passing the result value (`S`).

#### Example:

Here’s the implementation of the divide function using `failure(F)` for failure and `success(S)` for success:

```ts
function divide(dividend: number, divisor: number): Result<DivisionByZeroError, number> {
    
    if (divisor === 0) {
        return failure(new DivisionByZeroError());
    }

    return success(dividend / divisor);

}
```

### Handling `Result`

To handle a result, use the `successfully()` and `failed()` methods of `Result` to determine the return type. Then, access the corresponding value safely.

#### Example:

Here’s an example of using the divide function to calculate the division of `x` and `y`:

```ts

const result = divide(x, y); // Get the result

if (result.failed()) {
    throw result.value; // Handle the error (e.g., throw)
}

console.log(`Result: ${result.value}`); // Process the success value

```

## RBAC - Role-based Access Control

This project uses Role-based Access Control (RBAC) to manage user permissions based on their roles.

### Roles:

1. Administrator;
2. Employee;
3. Student;
4. Pending;
5. Anonymous.

### Permissions:

|                       | Administrator | Employee         | Student          | Pending | Anonymous |
|-----------------------|---------------|------------------|------------------|---------|-----------|
| Complete signup       | ❌            | ❌               | ❌               | ✅     | ❌        |
| Search books          | ✅            | ✅               | ✅               | ❌     | ❌        |
| Add book to cart      | ✅            | ✅               | ✅               | ❌     | ❌        |
| Borrow a book         | ✅            | ✅               | ⚠️<sup>[1]</sup> | ❌     | ❌        |
| Renew book loan       | ✅            | ✅               | ✅               | ❌     | ❌        |
| Reserve borrowed book | ✅            | ✅               | ✅               | ❌     | ❌        |
| Generate reports      | ✅            | ⚠️<sup>[2]</sup> | ❌               | ❌     | ❌        |
| Add books             | ✅            | ❌               | ❌               | ❌     | ❌        |
| Update book details   | ✅            | ❌               | ❌               | ❌     | ❌        |
| Delete books          | ✅            | ❌               | ❌               | ❌     | ❌        |
| Track book quantity   | ✅            | ❌               | ❌               | ❌     | ❌        |

> ✅ means `allowed` \
> ❌ means `denied` \
> ⚠️ means `allowed w/ conditions`

#### Conditions:
1. Students can borrow a book for a maximum of seven days;
2. Employees can generate reports only for their loans.

## License

Distributed under the GPL v3.0 license. See [LICENSE](LICENSE) for more information.

## Contact

Victor Gabriel • [Github](https://github.com/Victor101106/) • victorgabriel101106+github@gmail.com \
Dyego Santos • [Github](https://github.com/pollary/) • diegopollary@gmail.com