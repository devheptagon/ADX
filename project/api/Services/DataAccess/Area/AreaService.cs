
using adx.Services;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;

public class AreaService
{

    public static List<AreaEntity> GetAreas(string page)
    {
        DataTable dataTable = new DataTable();
        using (SqlConnection connection = new SqlConnection(DBHelper.connStr))
        {
            var sql = page != null ? AreaSqlStrings.SelectByPageSql : AreaSqlStrings.SelectSql;
            using (SqlCommand sqlCommand = new SqlCommand(sql, connection))
            {
                sqlCommand.CommandType = CommandType.Text;
                if (page != null)
                {
                    sqlCommand.Parameters.Add(new SqlParameter("@page", SqlDbType.VarChar));
                    sqlCommand.Parameters["@page"].Value = page;
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
        var result = new List<AreaEntity>();
        foreach (DataRow row in dataTable.Rows)
        {
            var item = new AreaEntity();
            item.id = (System.Guid)row["id"];
            item.title = row["title"] == DBNull.Value ? "" : (string)row["title"];
            result.Add(item);
        }
        return result;
    }

    public static List<AreaEntity> GetArea(string id)
    {
        DataTable dataTable = new DataTable();
        using (SqlConnection connection = new SqlConnection(DBHelper.connStr))
        {
            using (SqlCommand sqlCommand = new SqlCommand(AreaSqlStrings.SelectByIdSql, connection))
            {
                sqlCommand.CommandType = CommandType.Text;
                if (id != null)
                {
                    sqlCommand.Parameters.Add(new SqlParameter("@area_id", SqlDbType.VarChar));
                    sqlCommand.Parameters["@area_id"].Value = id;
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
        var result = new List<AreaEntity>();
        foreach (DataRow row in dataTable.Rows)
        {
            var item = new AreaEntity();
            item.id = (System.Guid)row["id"];
            item.title = row["title"] == DBNull.Value ? "" : (string)row["title"];
            result.Add(item);
        }
        return result;
    }

    public static void DeleteArea(string id)
    {
        using (SqlConnection connection = new SqlConnection(DBHelper.connStr))
        {
            using (SqlCommand sqlCommand = new SqlCommand(AreaSqlStrings.DeleteSql, connection))
            {
                sqlCommand.CommandType = CommandType.Text;
                sqlCommand.Parameters.Add(new SqlParameter("@area_id", SqlDbType.VarChar));
                sqlCommand.Parameters["@area_id"].Value = id;
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

    public static void AddArea(AreaEntity entity)
    {
        using (SqlConnection connection = new SqlConnection(DBHelper.connStr))
        {
            using (SqlCommand sqlCommand = new SqlCommand(AreaSqlStrings.AddSql, connection))
            {
                sqlCommand.CommandType = CommandType.Text;

                sqlCommand.Parameters.Add(new SqlParameter("@title", SqlDbType.VarChar));
                sqlCommand.Parameters["@title"].Value = entity.title;

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

    public static void UpdateArea(AreaEntity entity)
    {
        using (SqlConnection connection = new SqlConnection(DBHelper.connStr))
        {
            using (SqlCommand sqlCommand = new SqlCommand(AreaSqlStrings.UpdateSql, connection))
            {
                sqlCommand.CommandType = CommandType.Text;

                sqlCommand.Parameters.Add(new SqlParameter("@id", SqlDbType.UniqueIdentifier));
                sqlCommand.Parameters["@id"].Value = entity.id;

                sqlCommand.Parameters.Add(new SqlParameter("@title", SqlDbType.VarChar));
                sqlCommand.Parameters["@title"].Value = entity.title;

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
