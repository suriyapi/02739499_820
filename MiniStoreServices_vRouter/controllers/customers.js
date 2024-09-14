const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

// insert one customer
const createCustomer = async (req, res) => {
    const { customer_id, first_name, last_name, address, email, phone_number } = req.body;
  
    try {
      // สร้างข้อมูลลูกค้าใหม่
      const cust = await prisma.customers.create({
        data: {
          customer_id,
          first_name,
          last_name,
          address,
          email,
          phone_number
        }
      });
  
      // ส่งการตอบกลับเมื่อสร้างลูกค้าสำเร็จ
      res.status(200).json({
        status: "ok",
        message: `User with ID = ${cust.customer_id} is created` // ส่ง ID ที่ถูกสร้างกลับไป
      });
    } catch (err) {
      // จัดการข้อผิดพลาด
      res.status(500).json({
        status: "error",
        message: "Failed to create user",
        error: err.message
      });
    }
  };
/*
const createCustomer = async (req, res) => {
    const { customer_id, first_name, last_name, address, email, phone_number } = req.body;
    try {
        const cust = await prisma.customers.create({
            data: {
                customer_id,
                first_name,
                last_name,
                address,
                email,
                phone_number
            }
        });
        res.status(200).json(cust);
    } catch (err) {
        res.status(500).json(err);
    }
};
*/
// Update one customer
const updateCustomer = async (req, res) => {
    const { first_name, last_name, address, email, phone_number } = req.body;
    const { id } = req.params; // Get the customer ID from the URL parameter

    // Build the data object for the update
    const data = {};
    if (first_name) data.first_name = first_name;
    if (last_name) data.last_name = last_name;
    if (address) data.address = address;
    if (email) data.email = email;
    if (phone_number) data.phone_number = phone_number;

    // Check if there's any data to update
    if (Object.keys(data).length === 0) {
        return res.status(400).json({ 
            status: 'error',
            message: 'No data provided for update.'
        });
    }

    try {
        const cust = await prisma.customers.update({
            data,
            where: { customer_id: Number(id) } // Use the ID from the URL
        });
        res.status(200).json({
            status: 'ok',
            message: `User with ID = ${id} is updated`,
            user: cust
        });
    } catch (err) {
        // Handle known Prisma errors
        if (err.code === 'P2002') {
            // Unique constraint violation (e.g., email already exists)
            res.status(400).json({ 
                status: 'error',
                message: 'Email already exists.' 
            });
        } else if (err.code === 'P2025') {
            // Record not found
            res.status(404).json({ 
                status: 'error',
                message: `User with ID = ${id} not found.` 
            });
        } else {
            // Handle other unexpected errors
            console.error('Update customer error: ', err);
            res.status(500).json({ 
                status: 'error',
                message: 'An unexpected error occurred.' 
            });
        }
    }
};



/*
// update one customer
const updateCustomer =  async (req, res) => {
    const { id, first_name, last_name, address, email, phone_number } = req.body;
    try {
        const cust = await prisma.customers.update({
            data: {
                first_name,
                last_name,
                address,
                email,
                phone_number
            },
            where: { customer_id: Number(id) }
        });
        res.status(200).json(cust);
    } catch (err) {
        res.status(500).json(err);
    }
};
*/
/*
// delete customer by customer_id
const deleteCustomer =  async (req, res) => {
    const id = req.params.id;
    try {
        const cust = await prisma.customers.delete({
            where: {
                customer_id: Number(id),
            },
        })
        res.status(200).json(cust)
    } catch (err) {
        res.status(500).json(err);
    }
};

*/
// Delete customer by customer_id

const deleteCustomer = async (req, res) => {
    const id = req.params.id;
  
    try {
      // ตรวจสอบว่าลูกค้ามีอยู่หรือไม่
      const existingCustomer = await prisma.customers.findUnique({
        where: {
          customer_id: Number(id),  // ตรวจสอบว่า customer_id เป็นตัวเลข
        },
      });
  
      // ถ้าไม่พบลูกค้า
      if (!existingCustomer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
  
      // ลบลูกค้า
      await prisma.customers.delete({
        where: {
          customer_id: Number(id),
        },
      });
  
      // ส่งข้อความเมื่อทำการลบสำเร็จ
      res.status(200).json({
        status: "ok",
        message: `User with ID = ${id} is deleted`  // แสดง ID ที่ถูกลบ
      });
    } catch (err) {
      console.error('Delete customer error: ', err);  // แสดงข้อผิดพลาดใน console
      res.status(500).json({ error: err.message });  // ส่งข้อความข้อผิดพลาดกลับไปที่ client
    }
  };
  
/*
const deleteCustomer = async (req, res) => {
    const id = req.params.id;

    try {
        // Check if customer exists (optional step)
        const existingCustomer = await prisma.customers.findUnique({
            where: {
                customer_id: Number(id),
            },
        });

        if (!existingCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        // Proceed to delete the customer
        await prisma.customers.delete({
            where: {
                customer_id: Number(id),
            },
        });

        res.status(200).json({ message: 'Customer deleted successfully' }); // Return success message
    } catch (err) {
        console.error('Delete customer error: ', err);
        res.status(500).json({ error: err.message });
    }
};
*/


// get all customers
const getCustomers = async (req, res) => {
    const custs = await prisma.customers.findMany()
    res.json(custs)
};
// get only one customer by customer_id
const getCustomer = async (req, res) => {
    const id = req.params.id;
    try {
        const cust = await prisma.customers.findUnique({
            where: { customer_id: Number(id) },
        });
        if (!cust) {
            res.status(404).json({ 'message': 'Customer not found!' });
        } else {
            res.status(200).json(cust);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};
// search any customer by name
const getCustomersByTerm = async (req, res) => {
    const searchString = req.params.term;
    try {
        const custs = await prisma.customers.findMany({
            where: {
                OR: [
                    {
                        first_name: {
                            contains: searchString
                        }
                    },
                    {
                        email: {
                            contains: searchString
                        }
                    }
                ]
            },
        });
        if (!custs || custs.length == 0) {
            res.status(404).json({ 'message': 'Customer not found!' });
        } else {
            res.status(200).json(custs);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};
module.exports = {
    createCustomer, getCustomer, getCustomers,
    updateCustomer, deleteCustomer, getCustomersByTerm
};


