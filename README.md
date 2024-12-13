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
- [Conventional Commits](#conventional-commits)
- [RBAC - Roles and Permissions](#rbac---role-based-access-control)
- [License](#license)
- [Contact](#contact)

## Requirements

1. `NodeJS v20.x`.

## Conventional Commits

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification to maintain a clean and consistent commit history.

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

## RBAC - Role-based Access Control

This project uses Role-based Access Control (RBAC) to manage user permissions based on their roles.

### Roles:

1. Administrator;
2. Teacher;
3. Student;
4. Anonymous.

### Permissions:

|           | Administrator | Teacher | Student           | Anonymous |
|-----------|---------------|---------|-------------------|-----------|
| Rent Book | ✅            | ✅      | ⚠️<sup>[1]</sup> | ❌        |

> ✅ means `allowed` \
> ❌ means `denied` \
> ⚠️ means `allowed w/ conditions`

#### Conditions:
1. Students can rent a book for a maximum of seven days and renew the rental at the end of the period with priority.

## License

Distributed under the GPL v3.0 license. See [LICENSE](LICENSE) for more information.

## Contact

Victor Gabriel • [Github](https://github.com/Victor101106/) • victorgabriel101106+github@gmail.com \
Dyego Santos • [Github](https://github.com/pollary/) • diegopollary@gmail.com