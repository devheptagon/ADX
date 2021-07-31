
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
            item.area_size = row["area_size"] == DBNull.Value ? "" : (string)row["area_size"];
            item.email = row["email"] == DBNull.Value ? "" : (string)row["email"];
            item.enquiry_type = row["enquiry_type"] == DBNull.Value ? "" : (string)row["enquiry_type"];
            item.first_name = row["first_name"] == DBNull.Value ? "" : (string)row["first_name"];
            item.last_name = row["last_name"] == DBNull.Value ? "" : (string)row["last_name"];
            item.location = row["location"] == DBNull.Value ? "" : (string)row["location"];
            item.price = row["price"] == DBNull.Value ? "" : (string)row["price"];
            item.property_type = row["property_type"] == DBNull.Value ? "" : (string)row["property_type"];
            item.user_type = row["user_type"] == DBNull.Value ? "" : (string)row["user_type"];
            item.create_date = row["create_date"] == DBNull.Value ? "" : row["create_date"].ToString();

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
                sqlCommand.Parameters["@Area_Size"].Value = entity.area_size;

                sqlCommand.Parameters.Add(new SqlParameter("@Email", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@Email"].Value = entity.email;

                sqlCommand.Parameters.Add(new SqlParameter("@Enquiry_Type", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@Enquiry_Type"].Value = entity.enquiry_type;

                sqlCommand.Parameters.Add(new SqlParameter("@First_Name", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@First_Name"].Value = entity.first_name;

                sqlCommand.Parameters.Add(new SqlParameter("@Last_Name", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@Last_Name"].Value = entity.last_name;

                sqlCommand.Parameters.Add(new SqlParameter("@Location", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@Location"].Value = entity.location;

                sqlCommand.Parameters.Add(new SqlParameter("@Price", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@Price"].Value = entity.price;

                sqlCommand.Parameters.Add(new SqlParameter("@Property_Type", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@Property_Type"].Value = entity.property_type;

                sqlCommand.Parameters.Add(new SqlParameter("@User_Type", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@User_Type"].Value = entity.user_type;

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
