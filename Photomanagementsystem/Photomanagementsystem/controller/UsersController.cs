using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Photomanagementsystem.data;
using Photomanagementsystem.model;

namespace Photomanagementsystem.controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly DbHelper db;

        public UsersController(DbHelper db)
        {
            this.db = db;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            List<Users> list = new();

            using (SqlConnection con = db.GetConnection())
            {
                con.Open();

                SqlCommand cmd = new SqlCommand(
                    "SELECT * FROM Users", con);

                SqlDataReader dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    list.Add(new Users()
                    {
                        UserID = Convert.ToInt32(dr["UserID"]),
                        FullName = dr["FullName"].ToString(),
                        Email = dr["Email"].ToString(),
                        Password = dr["Password"].ToString()
                    });
                }
            }

            return Ok(list);
        }

        [HttpPost]
        public IActionResult Add(Users user)
        {
            using (SqlConnection con = db.GetConnection())
            {
                con.Open();

                SqlCommand cmd = new SqlCommand(
                    @"INSERT INTO Users
                    (FullName,Email,Password)
                    VALUES
                    (@FullName,@Email,@Password)", con);

                cmd.Parameters.AddWithValue("@FullName", user.FullName);
                cmd.Parameters.AddWithValue("@Email", user.Email);
                cmd.Parameters.AddWithValue("@Password", user.Password);

                cmd.ExecuteNonQuery();
            }

            return Ok("Inserted Successfully");
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Users user)
        {
            using (SqlConnection con = db.GetConnection())
            {
                con.Open();

                SqlCommand cmd = new SqlCommand(
                    @"UPDATE Users
                    SET FullName=@FullName,
                        Email=@Email,
                        Password=@Password
                    WHERE UserID=@id", con);

                cmd.Parameters.AddWithValue("@FullName", user.FullName);
                cmd.Parameters.AddWithValue("@Email", user.Email);
                cmd.Parameters.AddWithValue("@Password", user.Password);
                cmd.Parameters.AddWithValue("@id", id);

                cmd.ExecuteNonQuery();
            }

            return Ok("Updated Successfully");
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            using (SqlConnection con = db.GetConnection())
            {
                con.Open();

                SqlCommand cmd = new SqlCommand(
                    "DELETE FROM Users WHERE UserID=@id", con);

                cmd.Parameters.AddWithValue("@id", id);

                cmd.ExecuteNonQuery();
            }

            return Ok("Deleted Successfully");
        }
    }
}
