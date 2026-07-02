using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Photomanagementsystem.data;
using Photomanagementsystem.model;

namespace Photomanagementsystem.controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly DbHelper db;

        public CategoriesController(DbHelper db)
        {
            this.db = db;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            List<Category> list = new();

            using (SqlConnection con = db.GetConnection())
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("SELECT * FROM Categories", con);
                SqlDataReader dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    list.Add(new Category()
                    {
                        CategoryID = Convert.ToInt32(dr["CategoryID"]),
                        CategoryName = dr["CategoryName"].ToString()
                    });
                }
            }

            return Ok(list);
        }

        [HttpPost]
        public IActionResult Add(Category category)
        {
            using (SqlConnection con = db.GetConnection())
            {
                con.Open();

                SqlCommand cmd = new SqlCommand(
                    @"INSERT INTO Categories (CategoryName)
                      VALUES (@CategoryName)", con);

                cmd.Parameters.AddWithValue("@CategoryName", category.CategoryName);

                cmd.ExecuteNonQuery();
            }

            return Ok("Category Inserted Successfully");
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Category category)
        {
            using (SqlConnection con = db.GetConnection())
            {
                con.Open();

                SqlCommand cmd = new SqlCommand(
                    @"UPDATE Categories
                      SET CategoryName=@CategoryName
                      WHERE CategoryID=@id", con);

                cmd.Parameters.AddWithValue("@CategoryName", category.CategoryName);
                cmd.Parameters.AddWithValue("@id", id);

                cmd.ExecuteNonQuery();
            }

            return Ok("Category Updated Successfully");
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            using (SqlConnection con = db.GetConnection())
            {
                con.Open();

                SqlCommand cmd = new SqlCommand(
                    "DELETE FROM Categories WHERE CategoryID=@id", con);

                cmd.Parameters.AddWithValue("@id", id);

                cmd.ExecuteNonQuery();
            }

            return Ok("Category Deleted Successfully");
        }
    }
}
    

