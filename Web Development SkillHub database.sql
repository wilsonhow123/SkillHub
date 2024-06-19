-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 18, 2024 at 05:16 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `skillhub`
--

-- --------------------------------------------------------

--
-- Table structure for table `achieved_badges`
--

CREATE TABLE `achieved_badges` (
  `Badge_ID` int(11) NOT NULL,
  `Badge_Type` varchar(50) NOT NULL,
  `Badge_Description` varchar(255) NOT NULL,
  `Date_Achieved` date NOT NULL,
  `Badge_Image` varchar(255) NOT NULL,
  `User_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `achieved_badges`
--

INSERT INTO `achieved_badges` (`Badge_ID`, `Badge_Type`, `Badge_Description`, `Date_Achieved`, `Badge_Image`, `User_ID`) VALUES
(19, '1 Year User', 'You have been a user for a year!', '2024-02-17', './img/badges/OneYear.png', 5),
(20, '1 Year User', 'You have been a user for a year!', '2024-02-17', './img/badges/OneYear.png', 6);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `Category_ID` int(11) NOT NULL,
  `Category_Name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`Category_ID`, `Category_Name`) VALUES
(1, 'Science'),
(2, 'Mathematic'),
(3, 'Professional English'),
(4, 'Computer Science'),
(5, 'Biology'),
(6, 'Chemistry'),
(7, 'Physic'),
(8, 'Economic'),
(9, 'Accounting'),
(10, 'Design'),
(11, 'Others');

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `Course_ID` int(11) NOT NULL,
  `Course_Name` varchar(50) DEFAULT NULL,
  `Description` varchar(2000) DEFAULT NULL,
  `Duration` int(11) NOT NULL,
  `Total_Participator` int(16) DEFAULT NULL,
  `Image_Name` varchar(50) DEFAULT NULL,
  `Image_Path` varchar(255) DEFAULT NULL,
  `Category_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`Course_ID`, `Course_Name`, `Description`, `Duration`, `Total_Participator`, `Image_Name`, `Image_Path`, `Category_ID`) VALUES
(35, 'Figma Fundamentals', 'Course Title: Figma Fundamentals  Course Overview: This course is designed to provide participants with a comprehensive understanding of Figma, a popular collaborative design tool used for interface design, prototyping, and collaboration. Whether you\'re a beginner or have some experience with design tools, this course aims to equip you with the essential skills and knowledge to efficiently use Figma in your design workflow.  Key Learning Objectives:  Introduction to Figma:  Overview of Figma\'s interface and key features Understanding the basic tools and functionalities Design Principles:  Fundamentals of design principles applicable in Figma Typography, color theory, and layout design within the Figma environment Creating and Editing Designs:  Creating and manipulating shapes, text, and images Working with layers and organizing your design elements Prototyping:  Understanding Figma\'s prototyping capabilities Creating interactive prototypes to showcase user flows Collaboration and Sharing:  Utilizing Figma\'s collaboration features for team projects Sharing and gathering feedback on designs Advanced Features:  Mastering more advanced features, such as components and styles Integrating plugins to enhance your design process Best Practices:  Tips and tricks for efficient design workflow Collaborative practices and version control', 20, 2, 'unsplash_mRMQwK513hY', './cover_img/unsplash_mRMQwK513hY65d0d52362db3.png', 10),
(36, 'Advanced Prototyping in Figma', ' The Advanced Prototyping in Figma course delves deep into the intricacies of creating sophisticated and interactive user experiences. Participants will expand their prototyping skills beyond basic interactions, learning to implement advanced animations, micro-interactions, and conditional flows within Figma. The course covers the integration of smart animate features, easing functions, and complex transitions, empowering designers to bring their digital prototypes to life with a polished and dynamic touch. Additionally, participants explore user testing methodologies, gathering insights on user behavior through prototyped scenarios. By the end of the course, students will have mastered the art of advanced prototyping in Figma, enabling them to craft immersive and user-centric experiences for diverse digital platforms.', 40, 1, 'unsplash_mRMQwK513hY', './cover_img/unsplash_mRMQwK513hY65d0d611aaa2d.png', 10),
(38, 'Strategic Business Leadership', 'The Strategic Business Leadership course is designed for professionals seeking to develop the skills and insights necessary for effective leadership in a dynamic business environment. Participants will explore strategic decision-making, organizational dynamics, and the integration of innovation and technology into business strategies. The curriculum emphasizes the development of leadership capabilities, strategic thinking, and the ability to navigate complexities in the global business landscape. Through case studies, interactive discussions, and real-world applications, participants will gain the knowledge and tools needed to lead their organizations strategically, fostering adaptability and sustainable growth.', 70, 2, 'adeolu-eletu-E7RLgUjjazc-unsplash', './cover_img/adeolu-eletu-E7RLgUjjazc-unsplash65d0d76d63a97.jpg', 8),
(39, 'Python Programming Fundamentals', 'The Python Programming Fundamentals course is tailored for beginners looking to develop a strong foundation in one of the most versatile and widely used programming languages. Participants will embark on a hands-on journey, covering essential concepts such as variables, data types, control structures, functions, and object-oriented programming. The course includes practical exercises and projects to reinforce learning, enabling students to write effective Python code. By the end of the course, participants will be equipped with the skills needed to tackle real-world programming challenges and lay the groundwork for more advanced Python applications.', 90, 2, 'python', './cover_img/python65d0d80476d6b.jpg', 4),
(42, 'Java Programming ', 'The Java Programming Essentials course is designed for individuals aiming to acquire a comprehensive understanding of the Java programming language. Covering key concepts such as variables, control structures, object-oriented programming, and exception handling, this course is tailored for beginners. Through hands-on coding exercises and real-world projects, participants will not only grasp the syntax but also develop problem-solving skills essential for Java application development. By the course\'s conclusion, students will be well-versed in writing efficient and maintainable Java code, setting the stage for further exploration into advanced Java programming topics.', 20, 1, 'How-to-Pursue-a-Java-Course', './cover_img/How-to-Pursue-a-Java-Course65d0d9c7c948b.jpeg', 4),
(43, 'Full Stack', 'The Full Stack Web Development Masterclass is a comprehensive program designed for aspiring developers seeking proficiency in both front-end and back-end technologies. Participants will explore the fundamentals of HTML, CSS, and JavaScript for creating dynamic and responsive user interfaces. The course then transitions to server-side scripting, covering popular frameworks such as Node.js for back-end development. Participants will gain hands-on experience with databases, API integration, and deploy full-fledged applications. By the end of the course, students will have the skills to architect and implement end-to-end web solutions, making them well-versed full-stack developers.', 40, 1, 'unsplash_mRMQwK513hY', './cover_img/unsplash_mRMQwK513hY65d0da3210f42.png', 4),
(44, 'Effective Time ', 'The Effective Time Management Strategies course is designed to empower individuals with practical skills and techniques to maximize productivity and achieve personal and professional goals. Participants will explore proven time management methodologies, prioritize tasks, set realistic goals, and implement strategies for overcoming common challenges. The course also addresses effective delegation, goal setting, and techniques for minimizing procrastination. Through a combination of theoretical insights and practical exercises, participants will develop a personalized approach to managing their time efficiently, leading to increased productivity and a better work-life balance.', 15, 1, 'unsplash_mRMQwK513hY', './cover_img/unsplash_mRMQwK513hY65d0da981f48b.png', 11),
(45, 'Business Strategy and Planning', 'The Effective Time Management Strategies course is designed to empower individuals with practical skills and techniques to maximize productivity and achieve personal and professional goals. Participants will explore proven time management methodologies, prioritize tasks, set realistic goals, and implement strategies for overcoming common challenges. The course also addresses effective delegation, goal setting, and techniques for minimizing procrastination. Through a combination of theoretical insights and practical exercises, participants will develop a personalized approach to managing their time efficiently, leading to increased productivity and a better work-life balance.', 90, 2, 'unsplash_mRMQwK513hY', './cover_img/unsplash_mRMQwK513hY65d0db50ec1ad.png', 8),
(47, 'UX Research', 'The Figma for UX Research and Wireframing Mastery course is designed for UX designers and researchers looking to harness the power of Figma for streamlined and effective user experience processes. Participants will explore how Figma can be leveraged for user research, persona creation, and wireframing. The course covers best practices for collaboration between UX designers and researchers, utilizing Figma\'s real-time collaboration features. Participants will learn to create wireframes that translate research insights into intuitive and user-friendly interface designs. By the end of the course, students will have the skills to integrate Figma seamlessly into their UX research and wireframing workflows.', 20, 1, 'unsplash_mRMQwK513hY', './cover_img/unsplash_mRMQwK513hY65d0dc4992100.png', 10),
(48, 'Cybersecurity Fundamentals', 'The Cybersecurity Fundamentals course provides a comprehensive introduction to the principles and practices of cybersecurity. Aimed at individuals with varying levels of technical expertise, the course covers essential topics such as network security, cryptography, malware detection, risk management, and ethical hacking. Participants will gain an understanding of the foundational concepts in cybersecurity, learning how to identify and mitigate security threats. Through hands-on exercises and case studies, students will develop practical skills to protect digital assets, ensuring a solid foundation for those pursuing careers in cybersecurity.', 40, 2, 'unsplash_mRMQwK513hY', './cover_img/unsplash_mRMQwK513hY65d0dcd0f029a.png', 4),
(49, 'English Course', 'The English Language Proficiency and Communication Skills course are designed to enhance participants\' competence in both written and verbal communication. The curriculum covers grammar fundamentals, vocabulary enrichment, effective writing techniques, and public speaking skills. Participants will engage in practical exercises, discussions, and presentations to refine their language proficiency and develop clear and concise communication strategies. The course aims to empower individuals to communicate confidently and professionally in various personal and professional settings.', 120, 0, '360_F_227268299_liM3oGuQApMjXf23x7rSeFJxLgV6bMcC', './cover_img/360_F_227268299_liM3oGuQApMjXf23x7rSeFJxLgV6bMcC65d0dd9693beb.jpg', 3),
(50, 'Foundations of Science', 'The Foundations of Science course provides a comprehensive exploration of the scientific method and its applications across various disciplines. Participants will delve into the principles of biology, chemistry, physics, and earth sciences, gaining a broad understanding of fundamental scientific concepts. The course emphasizes hands-on experiments, data analysis, and critical thinking skills to foster a deeper appreciation for the scientific process. By the end of the course, participants will have a solid foundation in scientific inquiry, enabling them to approach and understand scientific phenomena with a systematic and analytical mindset.', 140, 0, 'Science', './cover_img/Science65d0de46a080c.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `donation`
--

CREATE TABLE `donation` (
  `Donation_ID` int(11) NOT NULL,
  `Donation_Amount` decimal(10,2) DEFAULT NULL,
  `Donation_Date` date DEFAULT NULL,
  `Receipt_Name` varchar(255) DEFAULT NULL,
  `Receipt_Path` varchar(255) DEFAULT NULL,
  `User_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `enrolled_course`
--

CREATE TABLE `enrolled_course` (
  `Course_ID` int(11) NOT NULL,
  `User_ID` int(11) NOT NULL,
  `Enrolled_Date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `enrolled_course`
--

INSERT INTO `enrolled_course` (`Course_ID`, `User_ID`, `Enrolled_Date`) VALUES
(35, 5, '2024-02-18'),
(35, 6, '2024-02-17'),
(36, 6, '2024-02-17'),
(38, 5, '2024-02-18'),
(38, 6, '2024-02-17'),
(39, 6, '2024-02-17'),
(42, 6, '2024-02-17'),
(43, 6, '2024-02-17'),
(44, 6, '2024-02-17'),
(45, 6, '2024-02-17'),
(47, 6, '2024-02-17');

-- --------------------------------------------------------

--
-- Table structure for table `exercise`
--

CREATE TABLE `exercise` (
  `Exercise_ID` int(11) NOT NULL,
  `Exercise_Name` varchar(50) DEFAULT NULL,
  `Chapter` int(11) DEFAULT NULL,
  `Total_Question_Number` int(11) DEFAULT NULL,
  `Course_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `exercise`
--

INSERT INTO `exercise` (`Exercise_ID`, `Exercise_Name`, `Chapter`, `Total_Question_Number`, `Course_ID`) VALUES
(38, 'Figma Exercises', 1, 5, 35),
(39, 'Figma\'s advanced prototyping', 1, 1, 36),
(41, 'Strategic Business Leadership ', 1, 1, 38),
(42, 'Python Programming Fundamentals', 1, 1, 39),
(45, 'Java Programming Essentials', 1, 1, 42),
(46, 'Full Stack Web Development ', 1, 1, 43),
(47, 'Effective Time Management Strategies', 1, 1, 44),
(48, 'Strategic Business Planning and Execution', 1, 1, 45),
(50, 'Figma for UX Research and Wireframing Mastery', 1, 1, 47),
(51, 'Cybersecurity Fundamentals', 1, 1, 48),
(52, 'English Language Proficiency and Communication Ski', 1, 1, 49),
(53, 'Foundations of Science: Exploring the Scientific M', 1, 1, 50);

-- --------------------------------------------------------

--
-- Table structure for table `published_course`
--

CREATE TABLE `published_course` (
  `Course_ID` int(11) NOT NULL,
  `User_ID` int(11) NOT NULL,
  `Published_Date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `published_course`
--

INSERT INTO `published_course` (`Course_ID`, `User_ID`, `Published_Date`) VALUES
(35, 5, '2024-02-17'),
(36, 5, '2024-02-17'),
(38, 5, '2024-02-17'),
(39, 5, '2024-02-17'),
(42, 5, '2024-02-17'),
(43, 5, '2024-02-17'),
(44, 5, '2024-02-17'),
(45, 5, '2024-02-17'),
(47, 5, '2024-02-17'),
(48, 5, '2024-02-17'),
(49, 5, '2024-02-17'),
(50, 5, '2024-02-17');

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `Question_No` int(11) NOT NULL,
  `Exercise_ID` int(11) NOT NULL,
  `Description` varchar(512) DEFAULT NULL,
  `OptionA` varchar(255) DEFAULT NULL,
  `OptionB` varchar(255) DEFAULT NULL,
  `OptionC` varchar(255) DEFAULT NULL,
  `OptionD` varchar(255) DEFAULT NULL,
  `Answer` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`Question_No`, `Exercise_ID`, `Description`, `OptionA`, `OptionB`, `OptionC`, `OptionD`, `Answer`) VALUES
(1, 38, 'What is Figma primarily used for in the design process?', 'Video Editing', 'Interface Design, Prototyping, and Collaboration', '3D Modeling', 'Audio Production', 'B'),
(1, 39, 'In Figma\'s advanced prototyping, what role do easing functions play in animations?', 'Adding background music to prototypes', 'Controlling the acceleration and deceleration of animations', 'Changing the color scheme of the design', 'Exporting prototypes to external devices', 'B'),
(1, 41, 'What is a key focus area in the Strategic Business Leadership course?', 'Graphic Design Principles', 'Strategic Decision-Making', 'Culinary Arts', 'Automotive Engineering', 'B'),
(1, 42, 'What is the primary focus of the Python Programming Fundamentals course?', 'Database Management', 'Web Design', 'Building a Foundation in Python Programming', 'Machine Learning Algorithms', 'C'),
(1, 45, 'What is a central focus of the Java Programming Essentials course?', 'Advanced Data Structures in Java', 'Artificial Intelligence', 'Building a Foundation in Java Programming', '3D Game Development', 'C'),
(1, 46, 'What is the primary goal of the Full Stack Web Development Masterclass?', 'Becoming a Mobile App Developer', 'Specializing in Front-end Technologies', 'Proficiency in Both Front-end and Back-end Development', 'Graphic Design for Websites', 'C'),
(1, 47, 'What is a key focus of the Effective Time Management Strategies course?', 'Creating Complex Schedules', 'Maximizing Procrastination', 'Setting Unrealistic Goals', 'Achieving Personal and Professional Goals', 'D'),
(1, 48, 'What aspect of business does the Strategic Business Planning and Execution course focus on?', 'Daily Operations', 'Strategic Planning and Formulation', 'Employee Training', 'Customer Service', 'B'),
(1, 50, 'What is the primary focus of the Figma for UX Research and Wireframing Mastery course?', '3D Animation', 'Graphic Design Principles', 'User Experience Research and Wireframing using Figma', 'Social Media Marketing', 'C'),
(1, 51, 'What is a primary objective of the Cybersecurity Fundamentals course?', 'Graphic Design', 'Advanced Data Analysis', 'Introduction to Computer Programming', 'Providing a Comprehensive Introduction to Cybersecurity Principles', 'D'),
(1, 52, 'What is a key focus of the English Language Proficiency and Communication Skills course?', 'Advanced Literary Analysis', 'Enhancing Proficiency in Multiple Languages', 'Grammar Fundamentals and Effective Communication', 'Technical Writing Skills', 'C'),
(1, 53, 'What is the primary focus of the Foundations of Science course?', 'Specialized Advanced Research in Physics', 'Understanding the Scientific Method and its Applications', 'Historical Analysis of Scientific Discoveries', 'Fictional Narratives in Science', 'B'),
(2, 38, 'Which design principle focuses on the arrangement of visual elements to create balance and order?', 'Contrast', 'Alignment', 'Proximity', 'Repetition', 'B'),
(3, 38, 'What is the purpose of Figma\'s prototyping feature?', 'Editing images', 'Creating interactive user interfaces', 'Applying color gradients', 'Exporting designs to PDF', 'B'),
(4, 38, 'How can you share a Figma project with team members for collaborative work?', 'Export as an image and share via email', 'Save it to a local drive', 'Use Figma\'s collaboration features and share a link', 'Print the design and distribute hard copies', 'C'),
(5, 38, 'What is a component in Figma?', 'A file format', 'A design element that can be reused and updated across the project', 'A color palette', 'A font style', 'B');

-- --------------------------------------------------------

--
-- Table structure for table `resource`
--

CREATE TABLE `resource` (
  `Resource_ID` int(11) NOT NULL,
  `Resource_Name` varchar(255) DEFAULT NULL,
  `File_Type` varchar(10) DEFAULT NULL,
  `File_Size` int(11) DEFAULT NULL,
  `File_Path` longtext DEFAULT NULL,
  `Chapter` int(11) DEFAULT NULL,
  `Course_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `resource`
--

INSERT INTO `resource` (`Resource_ID`, `Resource_Name`, `File_Type`, `File_Size`, `File_Path`, `Chapter`, `Course_ID`) VALUES
(38, 'world\'s shortest UI_UX design course', 'mp4', 14281759, './resource/world\\\'s shortest UI_UX design course65d0d52364bc2.mp4', 1, 35),
(39, 'world\'s shortest Figma course', 'mp4', 10941154, './resource/world\\\'s shortest Figma course65d0d611adfde.mp4', 1, 36),
(41, 'world\'s shortest UI_UX design course', 'mp4', 14281759, './resource/world\\\'s shortest UI_UX design course65d0d76d643d4.mp4', 1, 38),
(42, 'world\'s shortest UI_UX design course', 'mp4', 14281759, './resource/world\\\'s shortest UI_UX design course65d0d80477881.mp4', 1, 39),
(45, 'world\'s shortest Figma course', 'mp4', 10941154, './resource/world\\\'s shortest Figma course65d0d9c7ca303.mp4', 1, 42),
(46, 'world\'s shortest UI_UX design course', 'mp4', 14281759, './resource/world\\\'s shortest UI_UX design course65d0da3212e43.mp4', 1, 43),
(47, 'world\'s shortest UI_UX design course', 'mp4', 14281759, './resource/world\\\'s shortest UI_UX design course65d0da981fdc4.mp4', 1, 44),
(48, 'world\'s shortest UI_UX design course', 'mp4', 14281759, './resource/world\\\'s shortest UI_UX design course65d0db50ecb46.mp4', 1, 45),
(50, 'world\'s shortest UI_UX design course', 'mp4', 14281759, './resource/world\\\'s shortest UI_UX design course65d0dc4992962.mp4', 1, 47),
(51, 'world\'s shortest Figma course', 'mp4', 10941154, './resource/world\\\'s shortest Figma course65d0dcd0f12be.mp4', 1, 48),
(52, 'world\'s shortest Figma course', 'mp4', 10941154, './resource/world\\\'s shortest Figma course65d0dd969482d.mp4', 1, 49),
(53, 'world\'s shortest UI_UX design course', 'mp4', 14281759, './resource/world\\\'s shortest UI_UX design course65d0de46a11ee.mp4', 1, 50);

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `Review_ID` int(11) NOT NULL,
  `Review_Date` date DEFAULT NULL,
  `Comment` varchar(255) DEFAULT NULL,
  `User_ID` int(11) DEFAULT NULL,
  `Course_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`Review_ID`, `Review_Date`, `Comment`, `User_ID`, `Course_ID`) VALUES
(5, '2024-02-18', 'Good Course', 5, 35),
(6, '2024-02-18', 'Help a lots', 5, 35);

-- --------------------------------------------------------

--
-- Table structure for table `teach_request`
--

CREATE TABLE `teach_request` (
  `Request_ID` int(11) NOT NULL,
  `Request_Date` date NOT NULL,
  `Interested_Area` varchar(50) NOT NULL,
  `Reason` varchar(255) NOT NULL,
  `Background` varchar(50) NOT NULL,
  `Request_Status` varchar(50) NOT NULL,
  `User_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teach_request`
--

INSERT INTO `teach_request` (`Request_ID`, `Request_Date`, `Interested_Area`, `Reason`, `Background`, `Request_Status`, `User_ID`) VALUES
(1, '2023-12-12', 'Physic', 'I like Physic', 'Degree in Physic', 'Approve', 2),
(2, '2024-02-08', 'math', 'My dream is teacher', 'no', 'Approve', 5),
(3, '2024-02-12', 'daw', 'dwa', 'dwa', 'Approve', 6);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `User_ID` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `DOB` date NOT NULL,
  `Gender` varchar(50) NOT NULL,
  `Country` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Role` varchar(50) NOT NULL,
  `Register_Date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`User_ID`, `Name`, `DOB`, `Gender`, `Country`, `Email`, `Password`, `Role`, `Register_Date`) VALUES
(1, 'How', '2024-01-29', 'male', 'Bangladesh', 'lew@gmail.com', '$2y$10$C9/SuXbr2XQyuBCaNOYO3OpfcBjIk.UEn6ZKr1TE.MR6uq60l1S46', 'Admin', '2024-02-13'),
(2, 'how', '2023-11-28', 'Male', 'Malaysia', 'tp071331@mail.apu.edu.my', '$2y$10$ouiCcYuJbg5TvlqhM8VHqeoL84iwgAjMS001QxNrw8RFWWHYzW5My', 'Teacher', '2024-02-13'),
(5, 'How', '2023-11-11', 'male', 'Azerbaijan', 'whlew2003@gmail.com', '$2y$10$EEHV9WxGiZTbuYZH16mKCejZPFD0wU772LF9DDCiMVY0dWPSvLLxK', 'Teacher', '2023-02-05'),
(6, 'Testing1', '2024-02-21', 'male', 'France Metropolitan', 'testing@gmail.com', '$2y$10$PfEH9KRvAkPVyf.mIfhG9ux1GzKyuFt.niYg0CR.sEDTp7f0sEMh2', 'Teacher', '2023-02-01'),
(7, 'ABC', '2024-02-08', 'male', 'Bahrain', 'abc@gmail.com', '$2y$10$AoUni27OaEPcwDOcAXUTw.cD4W/uqwQI5Q66musa./nobpBNzOupu', 'Student', '2024-02-13'),
(8, '123', '2024-02-01', 'male', 'Bahamas', '123@gmail.com', '$2y$10$KFK22HRHmKQHGnrNxjtdzOF.LYMWATho0RQJJOtPKM51i.qOGSjiG', 'Student', '2023-02-06'),
(10, 'sc', '2024-02-02', 'male', 'Algeria', 'scott123@gmail.com', '$2y$10$elsYgVsjGNPlsblX0rI9N.22LOXHD0vIskAdb1VY1.Fuq.4mVmoL2', 'Teacher', '2022-02-14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `achieved_badges`
--
ALTER TABLE `achieved_badges`
  ADD PRIMARY KEY (`Badge_ID`),
  ADD KEY `User_ID` (`User_ID`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`Category_ID`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`Course_ID`),
  ADD KEY `Category_ID` (`Category_ID`);

--
-- Indexes for table `donation`
--
ALTER TABLE `donation`
  ADD PRIMARY KEY (`Donation_ID`),
  ADD KEY `User_ID` (`User_ID`);

--
-- Indexes for table `enrolled_course`
--
ALTER TABLE `enrolled_course`
  ADD PRIMARY KEY (`Course_ID`,`User_ID`),
  ADD KEY `User_ID` (`User_ID`);

--
-- Indexes for table `exercise`
--
ALTER TABLE `exercise`
  ADD PRIMARY KEY (`Exercise_ID`),
  ADD KEY `Course_ID` (`Course_ID`);

--
-- Indexes for table `published_course`
--
ALTER TABLE `published_course`
  ADD PRIMARY KEY (`Course_ID`,`User_ID`),
  ADD KEY `User_ID` (`User_ID`);

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`Question_No`,`Exercise_ID`),
  ADD KEY `Exercise_ID` (`Exercise_ID`);

--
-- Indexes for table `resource`
--
ALTER TABLE `resource`
  ADD PRIMARY KEY (`Resource_ID`),
  ADD KEY `Course_ID` (`Course_ID`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`Review_ID`),
  ADD KEY `User_ID` (`User_ID`),
  ADD KEY `Course_ID` (`Course_ID`);

--
-- Indexes for table `teach_request`
--
ALTER TABLE `teach_request`
  ADD PRIMARY KEY (`Request_ID`),
  ADD KEY `User_ID` (`User_ID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`User_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `achieved_badges`
--
ALTER TABLE `achieved_badges`
  MODIFY `Badge_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `Category_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `Course_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `donation`
--
ALTER TABLE `donation`
  MODIFY `Donation_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `exercise`
--
ALTER TABLE `exercise`
  MODIFY `Exercise_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `resource`
--
ALTER TABLE `resource`
  MODIFY `Resource_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `Review_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `teach_request`
--
ALTER TABLE `teach_request`
  MODIFY `Request_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `User_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `achieved_badges`
--
ALTER TABLE `achieved_badges`
  ADD CONSTRAINT `achieved_badges_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`);

--
-- Constraints for table `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `course_ibfk_1` FOREIGN KEY (`Category_ID`) REFERENCES `category` (`Category_ID`);

--
-- Constraints for table `donation`
--
ALTER TABLE `donation`
  ADD CONSTRAINT `donation_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`);

--
-- Constraints for table `enrolled_course`
--
ALTER TABLE `enrolled_course`
  ADD CONSTRAINT `enrolled_course_ibfk_1` FOREIGN KEY (`Course_ID`) REFERENCES `course` (`Course_ID`),
  ADD CONSTRAINT `enrolled_course_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`),
  ADD CONSTRAINT `enrolled_course_ibfk_3` FOREIGN KEY (`Course_ID`) REFERENCES `course` (`Course_ID`);

--
-- Constraints for table `exercise`
--
ALTER TABLE `exercise`
  ADD CONSTRAINT `exercise_ibfk_1` FOREIGN KEY (`Course_ID`) REFERENCES `course` (`Course_ID`);

--
-- Constraints for table `published_course`
--
ALTER TABLE `published_course`
  ADD CONSTRAINT `published_course_ibfk_1` FOREIGN KEY (`Course_ID`) REFERENCES `course` (`Course_ID`),
  ADD CONSTRAINT `published_course_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`);

--
-- Constraints for table `question`
--
ALTER TABLE `question`
  ADD CONSTRAINT `question_ibfk_1` FOREIGN KEY (`Exercise_ID`) REFERENCES `exercise` (`Exercise_ID`);

--
-- Constraints for table `resource`
--
ALTER TABLE `resource`
  ADD CONSTRAINT `resource_ibfk_1` FOREIGN KEY (`Course_ID`) REFERENCES `course` (`Course_ID`);

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`),
  ADD CONSTRAINT `review_ibfk_2` FOREIGN KEY (`Course_ID`) REFERENCES `course` (`Course_ID`);

--
-- Constraints for table `teach_request`
--
ALTER TABLE `teach_request`
  ADD CONSTRAINT `teach_request_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `user` (`User_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
