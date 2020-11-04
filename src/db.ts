import postgres from 'postgres';
 
const sql = postgres('postgres://auaowlkn:9d8dTujF2S_M4HkF-ZXCTErcp7GEwteC@lallah.db.elephantsql.com:5432/auaowlkn') // will default to the same as psql
 
export const getSalary = async () => {
    const salary =  await sql`
    SELECT * FROM salary
    `;
    console.log('salary', salary)
}

