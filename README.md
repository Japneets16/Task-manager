# Task Manager Application

A full-stack task management application built with Node.js/Express backend and React frontend.

## Features

### Backend Features

- 🔐 **User Authentication**: Register and login with JWT tokens
- 📧 **Email Integration**: Welcome emails for new users (configurable)
- 📝 **Task Management**: Full CRUD operations for tasks
- 🔍 **Task Filtering**: Filter tasks by status (pending, in-progress, completed)
- 🛡️ **Secure API**: Protected routes with JWT middleware
- 📊 **Task Status Tracking**: Organized task status management

### Frontend Features

- 🎨 **Modern UI**: Clean, responsive design with gradient themes
- 🔄 **Real-time Updates**: Instant task updates and status changes
- 📱 **Mobile Responsive**: Works perfectly on all device sizes
- 🔍 **Search & Filter**: Search tasks by title/description and filter by status
- 📊 **Dashboard Statistics**: Visual overview of task counts and status
- ✨ **Smooth Animations**: Enhanced user experience with transitions
- 🎯 **Intuitive UX**: Easy-to-use interface with clear navigation

## Tech Stack

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **Nodemailer** - Email functionality
- **Zod** - Input validation

### Frontend

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Lucide React** - Icon library
- **CSS3** - Custom styling with gradients and animations

## Project Structure

```
task-manager/
├── backend/
│   ├── controller/
│   │   ├── task.js          # Task CRUD operations
│   │   └── userlogic.js     # User authentication logic
│   ├── middleware/
│   │   └── auth.js          # JWT authentication middleware
│   ├── models/
│   │   ├── db.js            # Database connection
│   │   ├── task.js          # Task schema
│   │   └── user.js          # User schema
│   ├── routes/
│   │   └── authroutes.js    # API routes
│   ├── utils/
│   │   └── mailer.js        # Email functionality
│   ├── .env                 # Environment variables
│   ├── .env.example         # Environment template
│   ├── index.js             # Server entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   └── TaskList.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication

- `POST /api/auth/regis` - Register new user
- `POST /api/auth/login` - Login user

### Tasks

- `POST /api/auth/create` - Create new task
- `GET /api/auth/getalltask` - Get all tasks (with optional status filter)
- `GET /api/auth/getalltask/:id` - Get task by ID
- `POST /api/auth/update/:id` - Update task by ID
- `POST /api/auth/delete/:id` - Delete task by ID

## Environment Variables

Create a `.env` file in the root directory:

```env
# Database Configuration
MONGODB_URL=mongodb+srv://your-connection-string

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# JWT Configuration
JWT_SECRET=your-secret-key

# Server Configuration
PORT=3100
```

## Installation & Setup

1. **Clone the repository**

```bash
git clone <repository-url>
cd task-manager
```

2. **Install backend dependencies**

```bash
npm install
```

3. **Install frontend dependencies**

```bash
cd frontend
npm install
cd ..
```

4. **Configure environment variables**

```bash
cp .env.example .env
# Edit .env with your configuration
```

5. **Start the backend server**

```bash
npm run dev
# Server runs on http://localhost:3100
```

6. **Start the frontend development server**

```bash
cd frontend
npm run dev
# Frontend runs on http://localhost:5173
```

## Usage

1. **Register a new account** or **login** with existing credentials
2. **Create tasks** with title, description, status, and due date
3. **View all tasks** in the dashboard with statistics
4. **Filter tasks** by status (All, Pending, In Progress, Completed)
5. **Search tasks** by title or description
6. **Edit or delete tasks** using the action buttons
7. **Track progress** with visual status indicators

## Task Status Types

- **Pending** - Task is created but not started
- **In Progress** - Task is being worked on
- **Completed** - Task is finished

## Email Configuration

To enable welcome emails:

1. Use Gmail with App Passwords (recommended)
2. Set `EMAIL_USER` to your Gmail address
3. Set `EMAIL_PASS` to your Gmail App Password
4. Enable 2FA on your Gmail account
5. Generate an App Password in Gmail settings

## Development Notes

- Backend validates all inputs using Zod schemas
- Passwords are hashed using bcrypt
- JWT tokens expire in 24 hours
- Frontend uses React Context for state management
- Responsive design works on mobile and desktop
- Real-time updates without page refresh

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
