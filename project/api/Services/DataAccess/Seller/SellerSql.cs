
using System;
using System.Collections.Generic;
using System.Text;
using System.Collections;
using adx;

class SellerSqlStrings
{
    public static string SelectSql = @"SELECT * FROM [Seller] AS T ORDER BY T.fullname";

    public static string SelectByPageSql = SelectSql; // @"SELECT * FROM [Seller] AS T ORDER BY T.fullname OFFSET(@PAGE-1) * " + Constants.PAGE_SIZE + " ROWS FETCH NEXT " + Constants.PAGE_SIZE + " ROWS ONLY";

    public static string SelectByIdSql = "SELECT * FROM [Seller] AS T WHERE CAST(T.id AS VARCHAR(50)) = @id or CAST(T.user_id AS VARCHAR(50)) = @id";

    public static string AddSql = @"Insert Into [Seller] (fullname, email, phone, avatar, line1, line2, city, postcode) 
                VALUES(@fullname, @email, @phone, @avatar, @line1, @line2, @city, @postcode); select CONVERT(varchar(50),scope_identity())";

    public static string DeleteSql = "Delete From [Seller] Where id = @seller_id";

    public static string UpdateSql = @"Update [Seller] Set 
            fullname=@fullname, 
            email=@email, 
            phone=@phone, 
            avatar=@avatar, 
            line1=@line1, 
            line2=@line2, 
            city=@city, 
            postcode=@postcode
    WHERE CAST(id AS VARCHAR(50)) = @id or CAST(user_id AS VARCHAR(50)) = @user_id";

}