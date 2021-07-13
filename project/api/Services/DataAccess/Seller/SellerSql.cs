
using System;
using System.Collections.Generic;
using System.Text;
using System.Collections;

class SellerSqlStrings
{
    public static string SelectSql = @"SELECT * FROM [Seller] AS S";

    public static string SelectByIdSql = SelectSql + " WHERE CAST(S.id AS VARCHAR(50)) = @seller_id";

}

