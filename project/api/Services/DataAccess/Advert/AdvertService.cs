
using adx.Services;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;

public class AdvertService
{

    public static List<AdvertEntity> GetAdverts(string id)
    {
        DataTable dataTable = new DataTable();
        using (SqlConnection connection = new SqlConnection(DBHelper.connStr))
        {
            var sql = id != null ? AdvertSqlStrings.SelectByIdSql : AdvertSqlStrings.SelectSql;
            using (SqlCommand sqlCommand = new SqlCommand(sql, connection))
            {
                sqlCommand.CommandType = CommandType.Text;
                if (id != null)
                {
                    sqlCommand.Parameters.Add(new SqlParameter("@advert_id", SqlDbType.VarChar));
                    sqlCommand.Parameters["@advert_id"].Value = id;
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
        var result = new List<AdvertEntity>();
        foreach (DataRow row in dataTable.Rows)
        {
            var item = new AdvertEntity();
            item.areas = row["areas"] == DBNull.Value ? "" : (string)row["areas"];
            item.id = (System.Guid)row["id"];
            item.sectors = row["sectors"] == DBNull.Value ? "" : (string)row["sectors"];
            item.tags = row["tags"] == DBNull.Value ? "" : (string)row["tags"];
            item.title = row["title"] == DBNull.Value ? "" : (string)row["title"];
            result.Add(item);
        }
        return result;
    }

}
