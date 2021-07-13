
using adx.Services;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;

public class ContentService
{
    public static List<ContentEntity> GetContents()
    {
        DataTable dataTable = new DataTable();
        using (SqlConnection connection = new SqlConnection(DBHelper.connStr))
        {
            using (SqlCommand sqlCommand = new SqlCommand(ContentSqlStrings.SelectSql, connection))
            {
                sqlCommand.CommandType = CommandType.Text;
                try
                {
                    connection.Open();
                    using (SqlDataReader dataReader = sqlCommand.ExecuteReader())
                    {
                        dataTable.Load(dataReader);
                        dataReader.Close();
                    }
                }
                finally
                {
                    connection.Close();
                }
            }
        }
        var result = new List<ContentEntity>();
        foreach (DataRow row in dataTable.Rows)
        {
            var item = new ContentEntity();
            item.about = (String)row["about"];
            item.address = (String)row["address"];
            item.email = (String)row["email"];
            item.facebook = (String)row["facebook"];
            item.instagram = (String)row["instagram"];
            item.linkedin = (String)row["linkedin"];
            item.phone = (String)row["phone"];
            item.terms = (String)row["terms"];
            item.twitter = (String)row["twitter"];
            item.youtube = (String)row["youtube"];
            result.Add(item);
        }
        return result;
    }

    public static void UpdateContent(ContentEntity entity)
    {
        using (SqlConnection connection = new SqlConnection(DBHelper.connStr))
        {
            using (SqlCommand sqlCommand = new SqlCommand(ContentSqlStrings.UpdateSql, connection))
            {
                sqlCommand.CommandType = CommandType.Text;
                sqlCommand.Parameters.Add(new SqlParameter("@about", SqlDbType.VarChar));
                sqlCommand.Parameters["@about"].Value = entity.about;

                sqlCommand.Parameters.Add(new SqlParameter("@terms", SqlDbType.VarChar));
                sqlCommand.Parameters["@terms"].Value = entity.terms;

                sqlCommand.Parameters.Add(new SqlParameter("@address", SqlDbType.VarChar));
                sqlCommand.Parameters["@address"].Value = entity.address;

                sqlCommand.Parameters.Add(new SqlParameter("@phone", SqlDbType.VarChar));
                sqlCommand.Parameters["@phone"].Value = entity.phone;

                sqlCommand.Parameters.Add(new SqlParameter("@email", SqlDbType.VarChar));
                sqlCommand.Parameters["@email"].Value = entity.email;

                sqlCommand.Parameters.Add(new SqlParameter("@facebook", SqlDbType.VarChar));
                sqlCommand.Parameters["@facebook"].Value = entity.facebook;

                sqlCommand.Parameters.Add(new SqlParameter("@twitter", SqlDbType.VarChar));
                sqlCommand.Parameters["@twitter"].Value = entity.twitter;

                sqlCommand.Parameters.Add(new SqlParameter("@linkedin", SqlDbType.VarChar));
                sqlCommand.Parameters["@linkedin"].Value = entity.linkedin;

                sqlCommand.Parameters.Add(new SqlParameter("@instagram", SqlDbType.VarChar));
                sqlCommand.Parameters["@instagram"].Value = entity.instagram;

                sqlCommand.Parameters.Add(new SqlParameter("@youtube", SqlDbType.VarChar));
                sqlCommand.Parameters["@youtube"].Value = entity.youtube;

                for (var i = 0; i < sqlCommand.Parameters.Count; i++)
                {
                    if (sqlCommand.Parameters[i].Value == null) sqlCommand.Parameters[i].Value = DBNull.Value;
                }
                try
                {
                    connection.Open();
                    sqlCommand.ExecuteNonQuery();
                }
                finally
                {
                    connection.Close();
                }
            }
        }
    }

    //public void DeleteMetaRequest(string connString, int id)
    //{
    //    using (SqlConnection connection = new SqlConnection(connString))
    //    {
    //        using (SqlCommand sqlCommand = new SqlCommand(ContentRequestSqlStrings.DeleteSql, connection))
    //        {
    //            sqlCommand.CommandType = CommandType.Text;
    //            sqlCommand.Parameters.Add(new SqlParameter("@id", SqlDbType.VarChar, 50));
    //            sqlCommand.Parameters["@id"].Value = id;
    //            try
    //            {
    //                connection.Open();
    //                sqlCommand.ExecuteNonQuery();
    //            }
    //            finally
    //            {
    //                connection.Close();
    //            }
    //        }
    //    }
    //}


    //public DataRow GetMetaRequestById(string connString, int id)
    //{
    //    DataTable dataTable = new DataTable();
    //    using (SqlConnection connection = new SqlConnection(connString))
    //    {
    //        using (SqlCommand sqlCommand = new SqlCommand(ContentRequestSqlStrings.SelectByIdSql, connection))
    //        {
    //            sqlCommand.CommandType = CommandType.Text;
    //            sqlCommand.Parameters.Add(new SqlParameter("@id", SqlDbType.VarChar, 50));
    //            sqlCommand.Parameters["@id"].Value = id;
    //            try
    //            {
    //                connection.Open();
    //                using (SqlDataReader dataReader = sqlCommand.ExecuteReader())
    //                {
    //                    dataTable.Load(dataReader);
    //                    dataReader.Close();
    //                }
    //            }
    //            finally
    //            {
    //                connection.Close();
    //            }
    //        }
    //    }
    //    return dataTable.Rows.Count > 0 ? dataTable.Rows[0] : null;
    //}

    //public int AddMetaRequest(string connString, ContentRequestEntity entity)
    //{
    //    var id = 0;
    //    using (SqlConnection connection = new SqlConnection(connString))
    //    {
    //        using (SqlCommand sqlCommand = new SqlCommand(ContentRequestSqlStrings.AddSql, connection))
    //        {
    //            sqlCommand.CommandType = CommandType.Text;
    //            sqlCommand.Parameters.Add(new SqlParameter("@unique_id", SqlDbType.VarChar, 50));
    //            sqlCommand.Parameters["@unique_id"].Value = entity.unique_id;

    //            sqlCommand.Parameters.Add(new SqlParameter("@app_name", SqlDbType.VarChar, 50));
    //            sqlCommand.Parameters["@app_name"].Value = entity.app_name;

    //            sqlCommand.Parameters.Add(new SqlParameter("@app_version", SqlDbType.VarChar, 50));
    //            sqlCommand.Parameters["@app_version"].Value = entity.app_version;

    //            sqlCommand.Parameters.Add(new SqlParameter("@ip", SqlDbType.VarChar, 50));
    //            sqlCommand.Parameters["@ip"].Value = entity.ip;

    //            sqlCommand.Parameters.Add(new SqlParameter("@language", SqlDbType.VarChar, 50));
    //            sqlCommand.Parameters["@language"].Value = entity.language;

    //            sqlCommand.Parameters.Add(new SqlParameter("@client_date", SqlDbType.VarChar, 50));
    //            sqlCommand.Parameters["@client_date"].Value = entity.client_date;

    //            for (var i = 0; i < sqlCommand.Parameters.Count; i++)
    //            {
    //                if (sqlCommand.Parameters[i].Value == null) sqlCommand.Parameters[i].Value = DBNull.Value;
    //            }

    //            try
    //            {
    //                connection.Open();
    //                id = (int)sqlCommand.ExecuteScalar();
    //            }
    //            catch (Exception exp)
    //            {
    //                using (StreamWriter writer = new StreamWriter("log.txt", true))
    //                {
    //                    writer.Write(exp.Message);
    //                    writer.Close();
    //                }
    //            }
    //            finally
    //            {
    //                connection.Close();
    //            }
    //        }
    //    }
    //    return id;
    //}

}
