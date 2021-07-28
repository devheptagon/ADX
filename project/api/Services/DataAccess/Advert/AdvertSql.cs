
using System;
using System.Collections.Generic;
using System.Text;
using System.Collections;
using adx;

class AdvertSqlStrings
{
    private static string SelectBaseSql =
        @"SELECT ADV.*, 
        
        (SELECT STRING_AGG(T3.TITLE, ',') FROM [ADVERT] AS T1
        INNER JOIN [ADVERTSECTOR] AS T2 ON T1.ID = T2.ADVERT_ID
        INNER JOIN [SECTOR] AS T3 ON T2.SECTOR_ID = T3.ID
        WHERE ADV.ID = T1.ID
        ) AS SECTORS,

        (SELECT STRING_AGG(T3.TITLE, ',') FROM [ADVERT] AS T1
        INNER JOIN [ADVERTTAG] AS T2 ON T1.ID = T2.ADVERT_ID
        INNER JOIN [TAG] AS T3 ON T2.TAG_ID = T3.ID
        WHERE ADV.ID = T1.ID
        ) AS TAGS,

		(SELECT STRING_AGG(T3.TITLE, ',') FROM [ADVERT] AS T1
        INNER JOIN [ADVERTTENURE] AS T2 ON T1.ID = T2.ADVERT_ID
        INNER JOIN [TENURE] AS T3 ON T2.TENURE_ID = T3.ID
        WHERE ADV.ID = T1.ID
        ) AS TENURES,

		(SELECT ISNULL(S.FULLNAME,'') + '|' + ISNULL(S.EMAIL,'')+ '|' + ISNULL(S.PHONE,'') + '|' + ISNULL(S.AVATAR,'') + '|' + 
		ISNULL(S.LINE1,'') + '|' + ISNULL(S.LINE2,'') + '|' + ISNULL(S.CITY,'') + '|' + ISNULL(S.POSTCODE,'') FROM [SELLER] AS S 
		INNER JOIN [ADVERT] AS A ON S.ID = A.SELLER_ID AND A.ID = ADV.ID) AS SELLER

        FROM [ADVERT] AS ADV";

    public static string SelectSql = SelectBaseSql +
        @"
		WHERE 
			(@MIN_PRICE IS NULL OR (ADV.LEASEHOLDPRICE IS NOT NULL AND ADV.LEASEHOLDPRICE >= @MIN_PRICE) OR (ADV.FREEHOLDPRICE IS NOT NULL AND ADV.FREEHOLDPRICE >= @MIN_PRICE)) AND
			(@MAX_PRICE IS NULL OR (ADV.LEASEHOLDPRICE IS NOT NULL AND ADV.LEASEHOLDPRICE <= @MAX_PRICE) OR (ADV.FREEHOLDPRICE IS NOT NULL AND ADV.FREEHOLDPRICE <= @MAX_PRICE)) AND
			(@CITIES IS NULL OR (ADV.CITY IS NOT NULL AND @CITIES LIKE '%' + ADV.CITY + '%')) AND
			(@SECTORS IS NULL OR 
				(SELECT COUNT(0) FROM SECTOR AS T1 INNER JOIN ADVERTSECTOR AS T2 ON T1.ID = T2.SECTOR_ID AND T2.ADVERT_ID = ADV.ID 
				INNER JOIN (SELECT VALUE AS VALUE2 FROM STRING_SPLIT(@SECTORS, ',')) AS V2 ON T1.TITLE = V2.VALUE2) > 0) AND
			(@TAGS IS NULL OR 
				(SELECT COUNT(0) FROM TAG AS T1 INNER JOIN ADVERTTAG AS T2 ON T1.ID = T2.TAG_ID AND T2.ADVERT_ID = ADV.ID 
				INNER JOIN (SELECT VALUE AS VALUE2 FROM STRING_SPLIT(@TAGS, ',')) AS V2 ON T1.TITLE = V2.VALUE2) > 0) AND
			(@TENURES IS NULL OR 
				(SELECT COUNT(0) FROM TENURE AS T1 INNER JOIN ADVERTTENURE AS T2 ON T1.ID = T2.TENURE_ID AND T2.ADVERT_ID = ADV.ID 
				INNER JOIN (SELECT VALUE AS VALUE2 FROM STRING_SPLIT(@TENURES, ',')) AS V2 ON T1.TITLE = V2.VALUE2) > 0) AND
            (@USER_ID IS NULL OR 
                (SELECT COUNT(0) FROM DBO.[User] WHERE [role] = 'admin' and CAST(ID AS VARCHAR(100)) = @USER_ID) > 0 OR
                (SELECT COUNT(0) FROM DBO.[USER] AS T1 INNER JOIN DBO.SELLER AS T2 ON T1.id = T2.[USER_ID] AND CAST(T1.ID AS VARCHAR(100)) = @USER_ID WHERE ADV.SELLER_ID = T2.id) > 0
            )

        ORDER BY ADV.CREATE_DATE ";

    public static string SelectByPageSql = SelectSql + @"OFFSET(@PAGE-1) * " + Constants.PAGE_SIZE + " ROWS FETCH NEXT " + Constants.PAGE_SIZE + " ROWS ONLY";

    public static string SelectByIdSql = SelectBaseSql + " WHERE CAST(ADV.id AS VARCHAR(50)) = @advert_id";

    public static string SelectCountByUserIdAndAdvertIdSql = @"SELECT COUNT(0)
        FROM[ADX].[DBO].[ADVERT]
            AS T1
            INNER JOIN DBO.SELLER AS T2 ON T1.SELLER_ID = T2.ID
            INNER JOIN DBO.[USER] AS T3 ON T2.[USER_ID] = T3.ID
        WHERE CAST(T3.ID AS VARCHAR(50)) = @user_id AND @advert_id = T1.ID";

    public static string AddSql = @"Insert Into [Advert] 
        ([seller_id]
           ,[title]
           ,[description]
           ,[status]
           ,[freeHoldPrice]
           ,[leaseHoldPrice]
           ,[weeklyProfit]
           ,[monthlyProfit]
           ,[annualProfit]
           ,[weeklyTurnover]
           ,[monthlyTurnover]
           ,[annualTurnover]
           ,[line1]
           ,[line2]
           ,[city]
           ,[postcode]
           ,[images]) 
        VALUES(@seller_id
           ,@title
           ,@description
           ,@status
           ,@freeHoldPrice
           ,@leaseHoldPrice
           ,@weeklyProfit
           ,@monthlyProfit
           ,@annualProfit
           ,@weeklyTurnover
           ,@monthlyTurnover
           ,@annualTurnover
           ,@line1
           ,@line2
           ,@city
           ,@postcode
           ,@images); 
        select CONVERT(varchar(50),scope_identity())";

    public static string DeleteSql = "Delete From [Advert] Where id = @advert_id";

    public static string UpdateSql = @"Update [Advert] Set 
          [seller_id] = @seller_id,
          [title] = @title,
          [description] = @description,
          [status] = @status,
          [freeHoldPrice] = @freeHoldPrice,
          [leaseHoldPrice] = @leaseHoldPrice,
          [weeklyProfit] = @weeklyProfit,
          [monthlyProfit] = @monthlyProfit,
          [annualProfit] = @annualProfit,
          [weeklyTurnover] = @weeklyTurnover,
          [monthlyTurnover] = @monthlyTurnover,
          [annualTurnover] = @annualTurnover,
          [line1] = @line1,
          [line2] = @line2,
          [city] = @city,
          [postcode] = @postcode,
          [images] = @images
      WHERE id = @id";

    public static string RefreshDependenciesSql = @"
        delete from advertsector where advert_id = @advert_id;
        delete from adverttag where advert_id = @advert_id;
        delete from adverttenure where advert_id = @advert_id;

        insert into advertsector(advert_id, sector_id) 
        SELECT @advert_id, value FROM STRING_SPLIT(@sectors, ',')

        insert into adverttag(advert_id, tag_id) 
        SELECT @advert_id, value FROM STRING_SPLIT(@tags, ',')

        insert into AdvertTenure(advert_id, tenure_id) 
        SELECT @advert_id, T2.id FROM STRING_SPLIT(@tenures, ',') AS T1
        INNER JOIN Tenure AS T2 ON T1.value = T2.title;";
}

