
using adx.Services;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;

public class SellerService
{

    public static List<SellerEntity> GetSellers(string id)
    {
        DataTable dataTable = new DataTable();
        using (SqlConnection connection = new SqlConnection(DBHelper.connStr))
        {
            var sql = id != null ? SellerSqlStrings.SelectByIdSql : SellerSqlStrings.SelectSql;
            using (SqlCommand sqlCommand = new SqlCommand(sql, connection))
            {
                sqlCommand.CommandType = CommandType.Text;
                if (id != null)
                {
                    sqlCommand.Parameters.Add(new SqlParameter("@seller_id", SqlDbType.VarChar));
                    sqlCommand.Parameters["@seller_id"].Value = id;
                }

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
        var result = new List<SellerEntity>();
        foreach (DataRow row in dataTable.Rows)
        {
            var item = new SellerEntity();
            item.id = (System.Guid)row["id"];

            item.fullname = row["fullname"] == DBNull.Value ? "" : (string)row["fullname"];
            item.email = row["email"] == DBNull.Value ? "" : (string)row["email"];
            item.phone = row["phone"] == DBNull.Value ? "" : (string)row["phone"];
            item.avatar = row["avatar"] == DBNull.Value ? "" : (string)row["avatar"];
            item.line1 = row["line1"] == DBNull.Value ? "" : (string)row["line1"];
            item.line2 = row["line2"] == DBNull.Value ? "" : (string)row["line2"];
            item.city = row["city"] == DBNull.Value ? "" : (string)row["city"];
            item.county = row["county"] == DBNull.Value ? "" : (string)row["county"];
            item.region = row["region"] == DBNull.Value ? "" : (string)row["region"];
            item.postcode = row["postcode"] == DBNull.Value ? "" : (string)row["postcode"];

            result.Add(item);
        }
        return result;
    }

    public static void DeleteSeller(string id)
    {
        using (SqlConnection connection = new SqlConnection(DBHelper.connStr))
        {
            using (SqlCommand sqlCommand = new SqlCommand(SellerSqlStrings.DeleteSql, connection))
            {
                sqlCommand.CommandType = CommandType.Text;
                sqlCommand.Parameters.Add(new SqlParameter("@seller_id", SqlDbType.VarChar));
                sqlCommand.Parameters["@seller_id"].Value = id;
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

    public static void AddSeller(SellerEntity entity)
    {
        using (SqlConnection connection = new SqlConnection(DBHelper.connStr))
        {
            using (SqlCommand sqlCommand = new SqlCommand(SellerSqlStrings.AddSql, connection))
            {
                sqlCommand.CommandType = CommandType.Text;

                sqlCommand.Parameters.Add(new SqlParameter("@fullname", SqlDbType.VarChar));
                sqlCommand.Parameters["@fullname"].Value = entity.fullname;

                sqlCommand.Parameters.Add(new SqlParameter("@email", SqlDbType.VarChar));
                sqlCommand.Parameters["@email"].Value = entity.email;

                sqlCommand.Parameters.Add(new SqlParameter("@phone", SqlDbType.VarChar));
                sqlCommand.Parameters["@phone"].Value = entity.phone;

                sqlCommand.Parameters.Add(new SqlParameter("@avatar", SqlDbType.VarChar));
                sqlCommand.Parameters["@avatar"].Value = entity.avatar;

                sqlCommand.Parameters.Add(new SqlParameter("@line1", SqlDbType.VarChar));
                sqlCommand.Parameters["@line1"].Value = entity.line1;

                sqlCommand.Parameters.Add(new SqlParameter("@line2", SqlDbType.VarChar));
                sqlCommand.Parameters["@line2"].Value = entity.line2;

                sqlCommand.Parameters.Add(new SqlParameter("@city", SqlDbType.VarChar));
                sqlCommand.Parameters["@city"].Value = entity.city;

                sqlCommand.Parameters.Add(new SqlParameter("@county", SqlDbType.VarChar));
                sqlCommand.Parameters["@county"].Value = entity.county;

                sqlCommand.Parameters.Add(new SqlParameter("@region", SqlDbType.VarChar));
                sqlCommand.Parameters["@region"].Value = entity.region;

                sqlCommand.Parameters.Add(new SqlParameter("@postcode", SqlDbType.VarChar));
                sqlCommand.Parameters["@postcode"].Value = entity.postcode;

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
                    //using (StreamWriter writer = new StreamWriter("log.txt", true))
                    //{
                    //    writer.Write(exp.Message);
                    //    writer.Close();
                    //}
                }
                finally
                {
                    connection.Close();
                }
            }
        }
    }

    public static void UpdateSeller(SellerEntity entity)
    {
        using (SqlConnection connection = new SqlConnection(DBHelper.connStr))
        {
            using (SqlCommand sqlCommand = new SqlCommand(SellerSqlStrings.UpdateSql, connection))
            {
                sqlCommand.CommandType = CommandType.Text;

                sqlCommand.Parameters.Add(new SqlParameter("@id", SqlDbType.UniqueIdentifier));
                sqlCommand.Parameters["@id"].Value = entity.id;

                sqlCommand.Parameters.Add(new SqlParameter("@fullname", SqlDbType.VarChar));
                sqlCommand.Parameters["@fullname"].Value = entity.fullname;

                sqlCommand.Parameters.Add(new SqlParameter("@email", SqlDbType.VarChar));
                sqlCommand.Parameters["@email"].Value = entity.email;

                sqlCommand.Parameters.Add(new SqlParameter("@phone", SqlDbType.VarChar));
                sqlCommand.Parameters["@phone"].Value = entity.phone;

                sqlCommand.Parameters.Add(new SqlParameter("@avatar", SqlDbType.VarChar));
                sqlCommand.Parameters["@avatar"].Value = entity.avatar;

                sqlCommand.Parameters.Add(new SqlParameter("@line1", SqlDbType.VarChar));
                sqlCommand.Parameters["@line1"].Value = entity.line1;

                sqlCommand.Parameters.Add(new SqlParameter("@line2", SqlDbType.VarChar));
                sqlCommand.Parameters["@line2"].Value = entity.line2;

                sqlCommand.Parameters.Add(new SqlParameter("@city", SqlDbType.VarChar));
                sqlCommand.Parameters["@city"].Value = entity.city;

                sqlCommand.Parameters.Add(new SqlParameter("@county", SqlDbType.VarChar));
                sqlCommand.Parameters["@county"].Value = entity.county;

                sqlCommand.Parameters.Add(new SqlParameter("@region", SqlDbType.VarChar));
                sqlCommand.Parameters["@region"].Value = entity.region;

                sqlCommand.Parameters.Add(new SqlParameter("@postcode", SqlDbType.VarChar));
                sqlCommand.Parameters["@postcode"].Value = entity.postcode;

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
                    //using (StreamWriter writer = new StreamWriter("log.txt", true))
                    //{
                    //    writer.Write(exp.Message);
                    //    writer.Close();
                    //}
                }
                finally
                {
                    connection.Close();
                }
            }
        }
    }


}
