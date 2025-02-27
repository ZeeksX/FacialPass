// import React from 'react'
// import StudentSidebar from '../components/sidebars/StudentSidebar';

// const Profile = () => {
//     const student = {
//         name: "John Doe",
//         id: "CS202540",
//         email: "johndoe@example.com",
//         course: "Computer Science",
//         department: "Computing and Engineering Science",
//         level: "400 level (Final Year)",
//         courses: [
//             "Artificial Intelligence",
//             "Machine Learning",
//             "Computer Vision",
//             "Cybersecurity",
//             "Cloud Computing",
//             "Data Science",
//         ],
//         facialRecognitionEnrolled: true,
//     };
//     return (
//         <div className="flex flex-row min-h-screen w-full bg-gray-100 text-[#0061A2]">
//             <StudentSidebar />
//             <div className="flex flex-col max-ml-60 ml-[20%] w-4/5 p-6">
//             <h1 className="text-2xl font-bold mb-4">My Profile</h1>
//                 <div className="bg-white p-4 rounded-lg shadow-md mb-6">
//                     <h2 className="text-lg font-semibold mb-2">Profile Information</h2>
//                     <table className="w-full border border-gray-300">
//                         <tbody>
//                             <tr className="border-b border-gray-300">
//                                 <td className="p-4 font-semibold">Name:</td>
//                                 <td className="p-4">{student.name}</td>
//                             </tr>
//                             <tr className="border-b border-gray-300">
//                                 <td className="p-4 font-semibold">Student ID:</td>
//                                 <td className="p-4">{student.id}</td>
//                             </tr>
//                             <tr className="border-b border-gray-300">
//                                 <td className="p-4 font-semibold">Email:</td>
//                                 <td className="p-4">{student.email}</td>
//                             </tr>
//                             <tr className="border-b border-gray-300">
//                                 <td className="p-4 font-semibold">Course:</td>
//                                 <td className="p-4">{student.course}</td>
//                             </tr>
//                             <tr className="border-b border-gray-300">
//                                 <td className="p-4 font-semibold">Department:</td>
//                                 <td className="p-4">{student.department}</td>
//                             </tr>
//                             <tr className="border-b border-gray-300">
//                                 <td className="p-4 font-semibold">Year:</td>
//                                 <td className="p-4">{student.level}</td>
//                             </tr>
//                             <tr>
//                                 <td className="p-4 font-semibold">Facial Recognition:</td>
//                                 <td className="p-4">
//                                     {student.facialRecognitionEnrolled ? (
//                                         <span className="text-green-600 font-semibold">Enrolled</span>
//                                     ) : (
//                                         <span className="text-red-600 font-semibold">Not Enrolled</span>
//                                     )}
//                                 </td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Profile

// Dashboard.js
import React from 'react';

const Profile = () => {
  const studentName = "John Doe"; // Replace with dynamic data
  const upcomingExams = [
    { subject: "Math", date: "2023-10-15", time: "10:00 AM" },
    { subject: "Science", date: "2023-10-20", time: "1:00 PM" },
  ];
  const recentActivity = [
    { test: "Math Test 1", score: 85 },
    { test: "Science Quiz", score: 90 },
  ];
  const courses = [
    { name: "Mathematics", instructor: "Mr. Smith" },
    { name: "Science", instructor: "Ms. Johnson" },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white h-screen">
        <div className="p-4">
          <h2 className="text-lg font-bold">Profile</h2>
        </div>
        <nav className="mt-4">
          <ul>
            <li className="p-2 hover:bg-gray-700"><a href="#">Profile</a></li>
            <li className="p-2 hover:bg-gray-700"><a href="#">Select Courses</a></li>
            <li className="p-2 hover:bg-gray-700"><a href="#">Selected Course List</a></li>
            <li className="p-2 hover:bg-gray-700"><a href="#">Profile</a></li>
            <li className="p-2 hover:bg-gray-700"><a href="#">Settings</a></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Welcome back, {studentName}!</h1>
          <div className="flex items-center">
            <img src="/path/to/profile-logo.png" alt="Profile" className="w-10 h-10 rounded-full" />
          </div>
        </header>

        {/* Upcoming Exams */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Upcoming Exams</h2>
          <ul className="bg-white p-4 rounded shadow">
            {upcomingExams.map((exam, index) => (
              <li key={index} className="border-b py-2">
                {exam.subject} - {exam.date} at {exam.time}
              </li>
            ))}
          </ul>
        </section>

        {/* Recent Activity */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
          <ul className="bg-white p-4 rounded shadow">
            {recentActivity.map((activity, index) => (
              <li key={index} className="border-b py-2">
                {activity.test}: {activity.score}%
              </li>
            ))}
          </ul>
        </section>

        {/* Course Overview */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Course Overview</h2>
          <ul className="bg-white p-4 rounded shadow">
            {courses.map((course, index) => (
              <li key={index} className="border-b py-2">
                {course.name} - Instructor: {course.instructor}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Profile;