using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Photomanagementsystem.data;
using Photomanagementsystem.model;

namespace Photomanagementsystem.controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlbumsController : ControllerBase
    {
        private readonly DbHelper db;

        public AlbumsController(DbHelper db)
        {
            this.db = db;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            List<Album> list = new();

            using (SqlConnection con = db.GetConnection())
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("SELECT * FROM Albums", con);
                SqlDataReader dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    list.Add(new Album()
                    {
                        AlbumID = Convert.ToInt32(dr["AlbumID"]),
                        AlbumName = dr["AlbumName"].ToString(),
                        UserID = Convert.ToInt32(dr["UserID"])
                    });
                }
            }

            return Ok(list);
        }

        [HttpPost]
        public IActionResult Add(Album album)
        {
            using (SqlConnection con = db.GetConnection())
            {
                con.Open();

                SqlCommand cmd = new SqlCommand(
                    @"INSERT INTO Albums (AlbumName, UserID)
                      VALUES (@AlbumName, @UserID)", con);

                cmd.Parameters.AddWithValue("@AlbumName", album.AlbumName);
                cmd.Parameters.AddWithValue("@UserID", album.UserID);

                cmd.ExecuteNonQuery();
            }

            return Ok("Album Inserted Successfully");
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Album album)
        {
            using (SqlConnection con = db.GetConnection())
            {
                con.Open();

                SqlCommand cmd = new SqlCommand(
                    @"UPDATE Albums
                      SET AlbumName=@AlbumName, UserID=@UserID
                      WHERE AlbumID=@id", con);

                cmd.Parameters.AddWithValue("@AlbumName", album.AlbumName);
                cmd.Parameters.AddWithValue("@UserID", album.UserID);
                cmd.Parameters.AddWithValue("@id", id);

                cmd.ExecuteNonQuery();
            }

            return Ok("Album Updated Successfully");
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            using (SqlConnection con = db.GetConnection())
            {
                con.Open();

                SqlCommand cmd = new SqlCommand(
                    "DELETE FROM Albums WHERE AlbumID=@id", con);

                cmd.Parameters.AddWithValue("@id", id);

                cmd.ExecuteNonQuery();
            }

            return Ok("Album Deleted Successfully");
        }
    }
}
    


