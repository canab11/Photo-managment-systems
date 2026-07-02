namespace Photomanagementsystem.model
{
    public class Photos
    {
        public int PhotoID { get; set; }
        public string PhotoName { get; set; }
        public string PhotoPath { get; set; }
        public DateTime UploadDate { get; set; }
        public int AlbumID { get; set; }
    }
}
