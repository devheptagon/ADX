
using adx;
using adx.Services;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;

public class EnquiryService
{

    public static List<EnquiryEntity> GetEnquirys()
    {
        DataTable dataTable = new DataTable();
        using (SqlConnection connection = new SqlConnection(DBHelper.connStr))
        {
            using (SqlCommand sqlCommand = new SqlCommand(EnquirySqlStrings.SelectSql, connection))
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
        var result = new List<EnquiryEntity>();
        foreach (DataRow row in dataTable.Rows)
        {
            var item = new EnquiryEntity();
            item.id = (System.Guid)row["id"];
            item.Area_Size = row["area_size"] == DBNull.Value ? "" : (string)row["area_size"];
            item.Email = row["email"] == DBNull.Value ? "" : (string)row["email"];
            item.Enquiry_Type = row["enquiry_type"] == DBNull.Value ? "" : (string)row["enquiry_type"];
            item.First_Name = row["first_name"] == DBNull.Value ? "" : (string)row["first_name"];
            item.Last_Name = row["last_name"] == DBNull.Value ? "" : (string)row["last_name"];
            item.Location = row["location"] == DBNull.Value ? "" : (string)row["location"];
            item.Price = row["price"] == DBNull.Value ? "" : (string)row["price"];
            item.Property_Type = row["property_type"] == DBNull.Value ? "" : (string)row["property_type"];
            item.User_Type = row["user_type"] == DBNull.Value ? "" : (string)row["user_type"];

            result.Add(item);
        }
        return result;
    }

    public static void DeleteEnquiry(string id)
    {
        using (SqlConnection connection = new SqlConnection(DBHelper.connStr))
        {
            using (SqlCommand sqlCommand = new SqlCommand(EnquirySqlStrings.DeleteSql, connection))
            {
                sqlCommand.CommandType = CommandType.StoredProcedure;
                sqlCommand.Parameters.Add(new SqlParameter("@id", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@id"].Value = id;
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

    public static void AddEnquiry(EnquiryEntity entity)
    {
        using (SqlConnection connection = new SqlConnection(DBHelper.connStr))
        {
            using (SqlCommand sqlCommand = new SqlCommand(EnquirySqlStrings.AddSql, connection))
            {
                sqlCommand.CommandType = CommandType.StoredProcedure;

                sqlCommand.Parameters.Add(new SqlParameter("@Area_Size", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@Area_Size"].Value = entity.Area_Size;

                sqlCommand.Parameters.Add(new SqlParameter("@Email", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@Email"].Value = entity.Email;

                sqlCommand.Parameters.Add(new SqlParameter("@Enquiry_Type", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@Enquiry_Type"].Value = entity.Enquiry_Type;

                sqlCommand.Parameters.Add(new SqlParameter("@First_Name", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@First_Name"].Value = entity.First_Name;

                sqlCommand.Parameters.Add(new SqlParameter("@Last_Name", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@Last_Name"].Value = entity.Last_Name;

                sqlCommand.Parameters.Add(new SqlParameter("@Location", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@Location"].Value = entity.Location;

                sqlCommand.Parameters.Add(new SqlParameter("@Price", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@Price"].Value = entity.Price;

                sqlCommand.Parameters.Add(new SqlParameter("@Property_Type", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@Property_Type"].Value = entity.Property_Type;

                sqlCommand.Parameters.Add(new SqlParameter("@User_Type", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@User_Type"].Value = entity.User_Type;

                for (var i = 0; i < sqlCommand.Parameters.Count; i++)
                {
                    if (sqlCommand.Parameters[i].Value == null) sqlCommand.Parameters[i].Value = DBNull.Value;
                }

                try
                {
                    connection.Open();
                    sqlCommand.ExecuteScalar();
                }
                catch (Exception exp)
                {
                    Logger.LogError(exp.Message);
                }
                finally
                {
                    connection.Close();
                }
            }
        }
    }



}
