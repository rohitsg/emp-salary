import * as postgres from 'postgres';
 
const sql = postgres('postgres://auaowlkn:9d8dTujF2S_M4HkF-ZXCTErcp7GEwteC@lallah.db.elephantsql.com:5432/auaowlkn') // will default to the same as psql
 
export const getEmployee = async (id) => {
    const employee =  await sql`
    SELECT * FROM employee where id=${id}
    `;
    return employee;
}

 
export const getEmployees = async () => {
    const employees =  await sql`
    SELECT firstname, lastname, designation, salary.salary FROM employee LEFT JOIN salary ON employee.id = salary.empid;
    `;
    return employees;
}


export const emailValidation  = async (email) => {
    const employeeEmail =  await sql`
    SELECT email FROM employee where email=${email}
    `;
    return !!employeeEmail[0]?.email;

  }

export const passwordValidation   = async (password) => {
    const employeePassword =  await sql`
    SELECT hashedpassword FROM employee where hashedpassword=${password}
    `;

    return !!employeePassword[0]?.hashedpassword;
  }

  export const userValidation   = async (user) => {
    //hashedPassword logic should be there to be more secure, for now skipping this logic
    const {email, password} = user;
    const employeePassword =  await sql`
    SELECT * FROM employee where hashedpassword=${password} and email=${email}
    `;

    return !!(employeePassword[0]?.hashedpassword && employeePassword[0]?.email);
  }
