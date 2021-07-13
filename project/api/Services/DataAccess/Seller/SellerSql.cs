
using System;
using System.Collections.Generic;
using System.Text;
using System.Collections;

class SellerSqlStrings
{
    public static string SelectSql = @"SELECT * FROM [Seller] AS S";

    public static string SelectByIdSql = SelectSql + " WHERE CAST(S.id AS VARCHAR(50)) = @seller_id";

    public static string AddSql = @"Insert Into [Seller] (fullname, email, phone, avatar, line1, line2, city, county, region, postcode) 
                VALUES(@fullname, @email, @phone, @avatar, @line1, @line2, @city, @county, @region, @postcode); select CONVERT(varchar(50),scope_identity())";

    public static string DeleteSql = "Delete From [Seller] Where id = @seller_id";

    public static string UpdateSql = @"Update [Seller] Set 
            fullname=@fullname, 
            email=@email, 
            phone=@phone, 
            avatar=@avatar, 
            line1=@line1, 
            line2=@line2, 
            city=@city, 
            county=@county, 
            region=@region, 
            postcode=@postcode
    WHERE id = @id";

}

