
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
                sqlCommand.CommandType = CommandType.StoredProcedure;
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
                sqlCommand.CommandType = CommandType.StoredProcedure;

                sqlCommand.Parameters.Add(new SqlParameter("@about", SqlDbType.VarChar, -1));
                sqlCommand.Parameters["@about"].Value = entity.about;

                sqlCommand.Parameters.Add(new SqlParameter("@terms", SqlDbType.VarChar, -1));
                sqlCommand.Parameters["@terms"].Value = entity.terms;

                sqlCommand.Parameters.Add(new SqlParameter("@address", SqlDbType.VarChar, 500));
                sqlCommand.Parameters["@address"].Value = entity.address;

                sqlCommand.Parameters.Add(new SqlParameter("@phone", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@phone"].Value = entity.phone;

                sqlCommand.Parameters.Add(new SqlParameter("@email", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@email"].Value = entity.email;

                sqlCommand.Parameters.Add(new SqlParameter("@facebook", SqlDbType.VarChar, 200));
                sqlCommand.Parameters["@facebook"].Value = entity.facebook;

                sqlCommand.Parameters.Add(new SqlParameter("@twitter", SqlDbType.VarChar, 200));
                sqlCommand.Parameters["@twitter"].Value = entity.twitter;

                sqlCommand.Parameters.Add(new SqlParameter("@linkedin", SqlDbType.VarChar, 200));
                sqlCommand.Parameters["@linkedin"].Value = entity.linkedin;

                sqlCommand.Parameters.Add(new SqlParameter("@instagram", SqlDbType.VarChar, 200));
                sqlCommand.Parameters["@instagram"].Value = entity.instagram;

                sqlCommand.Parameters.Add(new SqlParameter("@youtube", SqlDbType.VarChar, 200));
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


}
