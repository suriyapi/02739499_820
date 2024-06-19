# ministore_backend_tutorial

ขั้นตอนการใช้งาน
1. สร้าง Database ด้วยคำสั่งในไฟล์ CreateDB.sql
2. ติดตั้ง Package โดยใช้คำสั่ง npm install
3. สร้างไฟล์ชื่อ .env เพื่อระบุรหัสผ่านของ DB โดยให้ใส่ข้อมูลดังนี้

   DATABASE_URL=mysql://root:adminpassword@localhost:3306/MiniStore

   *adminpassword - ให้แก้ไขรหัสผ่านของ user root ของ Database ที่จุดนี้ให้ตรงกับสิ่งที่ต้องการใช้งาน
   
5. สั่งให้ Server ทำงานโดยใช้คำสั่ง npm start
