using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Photomanagementsystem.data;
using Photomanagementsystem.model;

namespace Photomanagementsystem.controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly DbHelper db;

        public PhotosController(DbHelper db)
        {
            this.db = db;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            List<Photos> list = new();

            using (SqlConnection con = db.GetConnection())
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("SELECT * FROM Photos", con);
                SqlDataReader dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    list.Add(new Photos()
                    {
                        PhotoID = Convert.ToInt32(dr["PhotoID"]),
                        PhotoName = dr["PhotoName"].ToString(),
                        PhotoPath = dr["PhotoPath"].ToString(),
                        UploadDate = Convert.ToDateTime(dr["UploadDate"]),
                        AlbumID = Convert.ToInt32(dr["AlbumID"])
                    });
                }
            }

            return Ok(list);
        }

        [HttpPost]
        public IActionResult Add(Photos photo)
        {
            using (SqlConnection con = db.GetConnection())
            {
                con.Open();

                SqlCommand cmd = new SqlCommand(
                    @"INSERT INTO Photos (PhotoName, PhotoPath, UploadDate, AlbumID)
                      VALUES (@PhotoName, @PhotoPath, @UploadDate, @AlbumID)", con);

                cmd.Parameters.AddWithValue("@PhotoName", photo.PhotoName);
                cmd.Parameters.AddWithValue("@PhotoPath", photo.PhotoPath);
                cmd.Parameters.AddWithValue("@UploadDate", photo.UploadDate);
                cmd.Parameters.AddWithValue("@AlbumID", photo.AlbumID);

                cmd.ExecuteNonQuery();
            }

            return Ok("Photo Inserted Successfully");
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Photos photo)
        {
            using (SqlConnection con = db.GetConnection())
            {
                con.Open();

                SqlCommand cmd = new SqlCommand(
                    @"UPDATE Photos
                      SET PhotoName=@PhotoName,
                          PhotoPath=@PhotoPath,
                          UploadDate=@UploadDate,
                          AlbumID=@AlbumID
                      WHERE PhotoID=@id", con);

                cmd.Parameters.AddWithValue("@PhotoName", photo.PhotoName);
                cmd.Parameters.AddWithValue("@PhotoPath", photo.PhotoPath);
                cmd.Parameters.AddWithValue("@UploadDate", photo.UploadDate);
                cmd.Parameters.AddWithValue("@AlbumID", photo.AlbumID);
                cmd.Parameters.AddWithValue("@id", id);

                cmd.ExecuteNonQuery();
            }

            return Ok("Photo Updated Successfully");
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            using (SqlConnection con = db.GetConnection())
            {
                con.Open();

                SqlCommand cmd = new SqlCommand(
                    "DELETE FROM Photos WHERE PhotoID=@id", con);

                cmd.Parameters.AddWithValue("@id", id);

                cmd.ExecuteNonQuery();
            }

            return Ok("Photo Deleted Successfully");
        }
    }
}
    

