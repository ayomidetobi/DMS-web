# **Document Management System (DMS) - Web Application**

## **Overview**

This application provides an intuitive interface for managing and viewing court-related documents. It includes features such as detailed document views, listing documents, and error handling for seamless operations. It is built using modern technologies like React, React Query, React Router, and integrates with REST APIs.

---

## **Getting Started**

### **Prerequisites**

Before running the application, ensure you have the following installed on your system:

- **Node.js**: Version 18.x or higher.
- **npm** or **yarn**: A package manager to install dependencies.
- **React Query Devtools**: Optional for debugging queries.

---

### **Installation**

1. **Clone the Repository**:
   ```bash
   git clone origin https://github.com/ayomidetobi/DMS-web.git
   cd DMS-web
   ```

## Install Dependencies

Run the following command to install all the necessary packages:

```bash
npm install
```

### **Setup Environment Variables**

Create a `.env` file in the root directory and set the following variables:

```env
REACT_APP_API_BASE_URL=https://api.example.com
REACT_APP_ENV=development
```

- Replace `https://api.example.com` with the base URL of the backend API.
- Set `REACT_APP_ENV` to `development` for local development or `production` for deployment.

### **Start the Development Server:**

```bash
npm start
```

### **Build for Production**

To create a production-ready build:

```bash
npm run build
```

## Features

- **View Document List:** Display a list of all available documents with filtering and sorting capabilities.
- **Detailed Document View:** View comprehensive details about a specific document, including tribunal, date, and decision.
- **Error Handling:** Displays user-friendly error messages for API failures.
- **Navigation:** Navigate easily between document details and the main list.
- **Spinner:** Displays a loading spinner while fetching data.
- **Data Caching:** Efficiently fetch and cache data using React Query to minimize API calls and improve performance.

## SWOT Analysis

### Strengths

- **User-Friendly Interface:** Simple and intuitive design for users.
- **Modern Tech Stack:** Built with React and React Query, ensuring high performance and responsiveness.
- **Error Handling:** Comprehensive error handling ensures a smooth user experience.
- **Data Caching:** Utilizes React Query for efficient data fetching and caching, reducing API calls and enhancing performance.
- **Reusable Components:** Modular and maintainable components improve development efficiency.

### Weaknesses

- **Dependency on Backend API:** The app relies on a functioning API for its core features.
- **Limited Offline Support:** No dedicated offline-first features are implemented despite caching capabilities.
- **Lack of Internationalization (i18n):** The application does not support multiple languages, limiting its reach to non-English speaking users.

### Opportunities

- **Feature Expansion:** Potential to add search, document upload, and collaborative tools.
- **Mobile App:** Developing a mobile version of the application to reach more users.
- **Data Insights:** Integrate analytics to provide insights into document usage.
- **Internationalization:** Add multi-language support to expand the app's usability to a global audience.

### Threats

- **API Downtime:** Backend API unavailability can disrupt the user experience.
- **Security Risks:** Potential vulnerabilities due to sensitive document data.
- **Competition:** Similar applications in the market may reduce the adoption rate.

## Contributing

1. **Fork the repository.**
2. **Create a new feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Commit Your Changes

To commit your changes, use the following command:

```bash
git commit -m "Add your message here"
```

## Push to Your Branch

To push your changes to your branch, use the following command:

```bash
git push origin feature/your-feature-name
```
