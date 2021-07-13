
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
            item.id = (System.Guid)row["id"];
            item.seller_id = (System.Guid)row["seller_id"];
            item.title = row["title"] == DBNull.Value ? "" : (string)row["title"];
            item.description = row["description"] == DBNull.Value ? "" : (string)row["description"];
            item.status = row["status"] == DBNull.Value ? "" : (string)row["status"];
            item.freeHoldPrice = row["freeHoldPrice"] == DBNull.Value ? "" : (string)row["freeHoldPrice"];
            item.leaseHoldPrice = row["leaseHoldPrice"] == DBNull.Value ? "" : (string)row["leaseHoldPrice"];
            item.weeklyProfit = row["weeklyProfit"] == DBNull.Value ? "" : (string)row["weeklyProfit"];
            item.monthlyProfit = row["monthlyProfit"] == DBNull.Value ? "" : (string)row["monthlyProfit"];
            item.annualProfit = row["annualProfit"] == DBNull.Value ? "" : (string)row["annualProfit"];
            item.weeklyTurnover = row["weeklyTurnover"] == DBNull.Value ? "" : (string)row["weeklyTurnover"];
            item.monthlyTurnover = row["monthlyTurnover"] == DBNull.Value ? "" : (string)row["monthlyTurnover"];
            item.annualTurnover = row["annualTurnover"] == DBNull.Value ? "" : (string)row["annualTurnover"];
            item.line1 = row["line1"] == DBNull.Value ? "" : (string)row["line1"];
            item.line2 = row["line2"] == DBNull.Value ? "" : (string)row["line2"];
            item.city = row["city"] == DBNull.Value ? "" : (string)row["city"];
            item.county = row["county"] == DBNull.Value ? "" : (string)row["county"];
            item.region = row["region"] == DBNull.Value ? "" : (string)row["region"];
            item.postcode = row["postcode"] == DBNull.Value ? "" : (string)row["postcode"];
            item.create_date = row["create_date"] == DBNull.Value ? "" : row["create_date"].ToString();

            item.areas = row["areas"] == DBNull.Value ? "" : (string)row["areas"];
            item.sectors = row["sectors"] == DBNull.Value ? "" : (string)row["sectors"];
            item.tags = row["tags"] == DBNull.Value ? "" : (string)row["tags"];

            if (row["seller"] != DBNull.Value)
            {
                var sellerInfo = row["seller"].ToString().Split('|');
                item.seller = new SellerEntity()
                {
                    fullname = sellerInfo[0],
                    email = sellerInfo[1],
                    phone = sellerInfo[2],
                    avatar = sellerInfo[3],
                    line1 = sellerInfo[4],
                    line2 = sellerInfo[5],
                    city = sellerInfo[6],
                    county = sellerInfo[7],
                    region = sellerInfo[8],
                    postcode = sellerInfo[9]
                };
            }

            result.Add(item);
        }
        return result;
    }

}
