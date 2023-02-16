const mysql = require("mysql");
const env = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const uuidv4 = require("uuid").v4;

env.config();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cumsdbms",
});
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Mysql Connected");
});
// Database query promises
const zeroParamPromise = (sql) => {
  return new Promise((resolve, reject) => {
    db.query(sql, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

const queryParamPromise = (sql, queryParam) => {
  return new Promise((resolve, reject) => {
    db.query(sql, queryParam, (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};
const relations = [
  "marks",
  "attendance",
  "assignment",
  "class",
  "student",
  "staff",
  "course",
  "admin",
  "department",
];

const department_data = [
  { dept_id: "CN", d_name: "Chemical and Nanotechnologies" },
  { dept_id: "BE", d_name: "Biotechnology and Ecology" },
  { dept_id: "CSIT", d_name: "Computer Sciences and Information Technologies" },
  { dept_id: "CS", d_name: "Cyberphysical Systems" },
  { dept_id: "EI", d_name: "Economics of Innovations" },
];

const ece_courses = [
  {
    semester: 1,
    c_id: "8",
    name: "PHysics",
    c_type: "Theory",
    dept_id: "CS",
    credits: 4,
  },
];

const cse_courses = [
  {
    semester: 1,
    c_id: "7",
    name: "PHysics",
    c_type: "Theory",
    dept_id: "EI",
    credits: 4,
  },
];
const ice_courses = [
  {
    semester: 1,
    c_id: "6",
    name: "PHysics",
    c_type: "Practical",
    dept_id: "BE",
    credits: 4,
  },
];

const it_courses = [
  {
    semester: 1,
    c_id: "5",
    name: "Chemistry",
    c_type: "Practical",
    dept_id: "BE",
    credits: 4,
  },

  {
    semester: 5,
    c_id: "4",
    name: "Physics",
    c_type: "Theory",
    dept_id: "CN",
    credits: 4,
  },
];

const bt_courses = [
  {
    semester: 1,
    c_id: "3",
    name: "Physics",
    c_type: "Practical",
    dept_id: "CN",
    credits: 4,
  },
];
const mpae_courses = [
  {
    semester: 1,
    c_id: "2",
    name: "Chemistry",
    c_type: "Practical",
    dept_id: "CSIT",
    credits: 4,
  },
];
const me_courses = [
  {
    semester: 1,
    c_id: "1",
    name: "Chemistry",
    c_type: "Practical",
    dept_id: "CN",
    credits: 4,
  },
];

const studentsData = [
  {
    s_name: "Atayev Annabayram",
    gender: "Male",
    dob: "2000-01-02",
    email: "atayev@gmail.com",
    s_address: "Ashgabat city",
    contact: "99365656565",
    group: 4221,
    dept_id: "CS",
  },
  {
    s_name: "Bayramdurdyyev Remezan",
    gender: "Male",
    dob: "2000-01-03",
    email: "remezan@gmail.com",
    s_address: "Dashoguz city",
    contact: "99365656565",
    group: 4221,
    dept_id: "CS",
  },
  {
    s_name: "Bokusov Saparmyrat",
    gender: "Male",
    dob: "2000-01-04",
    email: "saparmyrat@gmail.com",
    s_address: "Ahal city",
    contact: "99365656565",
    group: 4411,
    dept_id: "CS",
  },
  {
    s_name: "Gylycmyradova Tazegul",
    gender: "Female",
    dob: "2000-01-05",
    email: "tazegul@gmail.com",
    s_address: "Balkan city",
    contact: "99365656565",
    group:4411,
    dept_id: "CS",
  },
  {
    s_name: "Charyyev Nurmyrat",
    gender: "Male",
    dob: "2000-01-06",
    email: "nurmyrat@cox.net",
    s_address: "Dashoguz city",
    contact: "99365656565",
    group: 4611,
    dept_id: "CS",
  },
  {
    s_name: "Atdayev Alladurdy",
    gender: "Male",
    dob: "2000-01-07",
    email: "allamur@gmail.com",
    s_address: "Lebap city",
    contact: "993656565",
    group: 4611,
    dept_id: "CS",
  },
  {
    s_name: "Abdullayev Abdulla",
    gender: "Male",
    dob: "2000-01-08",
    email: "abdulla@gmail.com",
    s_address: "Mary city",
    contact: "99365656565",
    group: 4221,
    dept_id: "CS",
  },
  {
    s_name: "Amanova Aynur",
    gender: "Female",
    dob: "2000-01-09",
    email: "aynur@gmail.com",
    s_address: "Ahal city",
    contact: "99365656565",
    group: 4221,
    dept_id: "CS",
  },
  {
    s_name: "Abdyyevea Mahriban",
    gender: "Female",
    dob: "2000-01-10",
    email: "mahriban@gmail.com",
    s_address: "Balkan city",
    contact: "99365656565",
    group: 4421,
    dept_id: "CS",
  },
  {
    s_name: "Allaberenova Akmaral",
    gender: "Female",
    dob: "2000-01-11",
    email: "akmaral@gmail.com",
    s_address: "Dashoguz",
    contact: "99365656565",
    group: 4421,
    dept_id: "CS",
  },
  {
    s_name: "Abdullayeva Jora",
    gender: "Male",
    dob: "2000-01-12",
    email: "jora@gmail.com",
    s_address: "Lebap city",
    contact: "99365656565",
    group: 4231,
    dept_id: "CS",
  },
  {
    s_name: "Agageldiyeva Aytach",
    gender: "Female",
    dob: "2000-01-13",
    email: "aytach@gmail.com",
    s_address: "Mary city",
    contact: "999365656565",
    group: 4231,
    dept_id: "CS",
  },
  {
    s_name: "Abayeva Shabosan",
    gender: "Female",
    dob: "2000-01-14",
    email: "shabossan@gmail.com",
    s_address: "Ahal city",
    contact: "99365656565",
    group: 4431,
    dept_id: "CS",
  },
  {
    s_name: "Ahmedova Leyli",
    gender: "Female",
    dob: "2000-01-15",
    email: "leyli@gorg.net",
    s_address: "Ashgabat city",
    contact: "99365656565",
    group: 4431,
    dept_id: "CS",
  },
  {
    s_name: "Abdullayev Azat",
    gender: "Male",
    dob: "2000-01-16",
    email: "azat@gmail.com",
    s_address: "Balkan city",
    contact: "99365656565",
    group: 4241,
    dept_id: "CS",
  },
  {
    s_name: "Durdyyev Durdymyrat",
    gender: "Male",
    dob: "2000-01-17",
    email: "durdymyrat@aol.com",
    s_address: "Dashoguz city",
    contact: "99365656565",
    group: 4241,
    dept_id: "CS",
  },
  {
    s_name: "Akmyradova Mahri",
    gender: "Female",
    dob: "2000-01-17",
    email: "mahri@aol.com",
    s_address: "Dashoguz city",
    contact: "99365656565",
    group: 4242,
    dept_id: "CS",
  },
  {
    s_name: "Allaberdiyeva Merjen",
    gender: "Female",
    dob: "2000-01-17",
    email: "merjen@aol.com",
    s_address: "Lebap city",
    contact: "99365656565",
    group: 4242,
    dept_id: "CS",
  },
  {
    s_name: "Agajanova Merjen",
    gender: "Female",
    dob: "2000-01-17",
    email: "merjen@aol.com",
    s_address: "Dashoguz city",
    contact: "99365656565",
    group: 4441,
    dept_id: "CS",
  },{
    s_name: "Atayev Hajymyrat",
    gender: "Male",
    dob: "2000-01-17",
    email: "hajymyrat@aol.com",
    s_address: "Dashoguz city",
    contact: "99365656565",
    group: 4441,
    dept_id: "CS",
  },
];

const staffData = [
  {
    st_name: "Mekan Toyjanov",
    dob: "2000-04-25",
    email: "mekan@gmail.com",
    st_address: "Ashgabat city",
    city: "Ashgabat city",
    contact: "99365656565",
  },
];

const reset = async () => {
  try {
    await new Promise((r) => setTimeout(r, 2000)); // wait for mysql connection
    await zeroParamPromise("SET FOREIGN_KEY_CHECKS = 0");
    for (let i = 0; i < relations.length; ++i) {
      await zeroParamPromise("TRUNCATE TABLE " + relations[i]);
      console.log(relations[i] + " truncated");
    }
    await zeroParamPromise("SET FOREIGN_KEY_CHECKS = 1");

    // 1.Add Admin
    const hashedPassword = await bcrypt.hash("admin123", 8);
    await queryParamPromise("insert into admin set ?", {
      admin_id: uuidv4(),
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
    });

    console.log("admin added");
    // 2.Add Departments
    for (let i = 0; i < department_data.length; ++i) {
      await queryParamPromise(
        "insert into department set ?",
        department_data[i]
      );
    }
    console.log("departments added");
    // 3.Add Courses
    for (let i = 0; i < ece_courses.length; ++i) {
      await queryParamPromise("insert into course set ?", ece_courses[i]);
    }
    for (let i = 0; i < cse_courses.length; ++i) {
      await queryParamPromise("insert into course set ?", cse_courses[i]);
    }
    for (let i = 0; i < ice_courses.length; ++i) {
      await queryParamPromise("insert into course set ?", ice_courses[i]);
    }
    for (let i = 0; i < it_courses.length; ++i) {
      await queryParamPromise("insert into course set ?", it_courses[i]);
    }
    for (let i = 0; i < bt_courses.length; ++i) {
      await queryParamPromise("insert into course set ?", bt_courses[i]);
    }
    for (let i = 0; i < mpae_courses.length; ++i) {
      await queryParamPromise("insert into course set ?", mpae_courses[i]);
    }
    for (let i = 0; i < me_courses.length; ++i) {
      await queryParamPromise("insert into course set ?", me_courses[i]);
    }
    console.log("courses added");
    // 4.Add Staffs
    for (let i = 0; i < staffData.length; ++i) {
      const currentStaff = staffData[i];
      const dept_id = department_data[parseInt(i / 5)].dept_id;
      const gender = i % 2 === 0 ? "Male" : "Female";
      const hashedPassword = await bcrypt.hash("teacher123", 8);
      await queryParamPromise("insert into staff set ?", {
        st_id: uuidv4(),
        st_name: currentStaff.st_name,
        gender,
        dob: currentStaff.dob,
        email: currentStaff.email,
        st_address:
          currentStaff.st_address +
          "-" +
          currentStaff.city +
          "-" +
          currentStaff.zip,
        contact: currentStaff.contact.split(" ")[0],
        dept_id,
        password: hashedPassword,
      });
    }
    console.log("staffs added");

    // 5.Add Students
    for (let i = 0; i < studentsData.length; ++i) {
      let currentStudent = studentsData[i];
      const hashedPassword = await bcrypt.hash("student123", 8);
      currentStudent = {
        s_id: uuidv4(),
        ...currentStudent,
        password: hashedPassword,
      };
      await queryParamPromise("insert into student set ?", currentStudent);
    }
    console.log("students added");
    // 5.Add Classes
    for (department of department_data) {
      const dept_id = department.dept_id;
      const staffs = await queryParamPromise(
        "SELECT st_id from staff where dept_id = ?",
        [dept_id]
      );
      const courses = await queryParamPromise(
        "SELECT c_id from course where dept_id = ? AND semester = ?",
        [dept_id, 1]
      );
      let st_idx = 0;
      for (let j = 0; j < courses.length; ++j) {
        await queryParamPromise("INSERT INTO class set ?", {
          group: 4531,
          semester: 1,
          c_id: courses[j].c_id,
          st_id: staffs[st_idx++].st_id,
        });
        await queryParamPromise("INSERT INTO class set ?", {
          group: 4532,
          semester: 1,
          c_id: courses[j].c_id,
          st_id: staffs[st_idx++].st_id,
        });
        await queryParamPromise("INSERT INTO class set ?", {
          group: 4531,
          semester: 1,
          c_id: courses[j].c_id,
          st_id: staffs[st_idx++].st_id,
        });
      }
    }
    console.log("Classes Added");
  } catch (err) {
    throw err;
  } finally {
    process.exit();
  }
};
reset();
