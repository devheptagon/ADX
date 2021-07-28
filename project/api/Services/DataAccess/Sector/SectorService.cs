
using adx.Services;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;

public class SectorService
{

    public static List<SectorEntity> GetSectors(string page)
    {
        DataTable dataTable = new DataTable();
        using (SqlConnection connection = new SqlConnection(DBHelper.connStr))
        {
            var sql = page != null ? SectorSqlStrings.SelectByPageSql : SectorSqlStrings.SelectSql;
            using (SqlCommand sqlCommand = new SqlCommand(sql, connection))
            {
                sqlCommand.CommandType = CommandType.Text;
                if (page != null)
                {
                    sqlCommand.Parameters.Add(new SqlParameter("@page", SqlDbType.VarChar, 10));
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
        var result = new List<SectorEntity>();
        foreach (DataRow row in dataTable.Rows)
        {
            var item = new SectorEntity();
            item.id = (System.Guid)row["id"];
            item.title = row["title"] == DBNull.Value ? "" : (string)row["title"];
            result.Add(item);
        }
        return result;
    }

    public static List<SectorEntity> GetSector(string id)
    {
        DataTable dataTable = new DataTable();
        using (SqlConnection connection = new SqlConnection(DBHelper.connStr))
        {
            using (SqlCommand sqlCommand = new SqlCommand(SectorSqlStrings.SelectByIdSql, connection))
            {
                sqlCommand.CommandType = CommandType.Text;
                if (id != null)
                {
                    sqlCommand.Parameters.Add(new SqlParameter("@sector_id", SqlDbType.VarChar, 100));
                    sqlCommand.Parameters["@sector_id"].Value = id;
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
        var result = new List<SectorEntity>();
        foreach (DataRow row in dataTable.Rows)
        {
            var item = new SectorEntity();
            item.id = (System.Guid)row["id"];
            item.title = row["title"] == DBNull.Value ? "" : (string)row["title"];
            result.Add(item);
        }
        return result;
    }

    public static void DeleteSector(string id)
    {
        using (SqlConnection connection = new SqlConnection(DBHelper.connStr))
        {
            using (SqlCommand sqlCommand = new SqlCommand(SectorSqlStrings.DeleteSql, connection))
            {
                sqlCommand.CommandType = CommandType.Text;
                sqlCommand.Parameters.Add(new SqlParameter("@sector_id", SqlDbType.VarChar, 100));
                sqlCommand.Parameters["@sector_id"].Value = id;
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

    public static void AddSector(SectorEntity entity)
    {
        using (SqlConnection connection = new SqlConnection(DBHelper.connStr))
        {
            using (SqlCommand sqlCommand = new SqlCommand(SectorSqlStrings.AddSql, connection))
            {
                sqlCommand.CommandType = CommandType.Text;

                sqlCommand.Parameters.Add(new SqlParameter("@title", SqlDbType.VarChar, 100));
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

    public static void UpdateSector(SectorEntity entity)
    {
        using (SqlConnection connection = new SqlConnection(DBHelper.connStr))
        {
            using (SqlCommand sqlCommand = new SqlCommand(SectorSqlStrings.UpdateSql, connection))
            {
                sqlCommand.CommandType = CommandType.Text;

                sqlCommand.Parameters.Add(new SqlParameter("@id", SqlDbType.VarChar));
                sqlCommand.Parameters["@id"].Value = entity.id?.ToString();

                sqlCommand.Parameters.Add(new SqlParameter("@title", SqlDbType.VarChar, 100));
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
