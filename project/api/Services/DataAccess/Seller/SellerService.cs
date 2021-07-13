
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

}
