USE [ADX]
GO
/****** Object:  StoredProcedure [dbo].[sp_add_advert]    Script Date: 14/08/2021 22:45:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_add_advert]
@seller_id varchar(100)
,@title varchar(500)
,@description varchar(max)
,@status varchar(100)
,@freeHoldPrice varchar(10)
,@leaseHoldPrice varchar(10)
,@weeklyProfit varchar(10)
,@monthlyProfit varchar(10)
,@annualProfit varchar(10)
,@weeklyTurnover varchar(10)
,@monthlyTurnover varchar(10)
,@annualTurnover varchar(10)
,@line1 varchar(100)
,@line2 varchar(100)
,@city varchar(100)
,@postcode varchar(10)
,@images varchar(max)
,@NewRecordId uniqueidentifier output
AS
BEGIN
	
	SET NOCOUNT ON;    

	DECLARE @NewIdsTable TABLE(NewRecordId UNIQUEIDENTIFIER);

	Insert Into [Advert] 
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
		OUTPUT inserted.id INTO @NewIdsTable(NewRecordId)
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
           ,@images)		  
		   
		SELECT @NewRecordId = NewRecordId FROM @NewIdsTable;
		
			
END
GO
/****** Object:  StoredProcedure [dbo].[sp_add_enquiry]    Script Date: 14/08/2021 22:45:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_add_enquiry]
	@enquiry_type VARCHAR(50), @user_type VARCHAR(50), @first_name VARCHAR(50), @last_name VARCHAR(50), @email VARCHAR(50), @location VARCHAR(50), @property_type VARCHAR(50), @price VARCHAR(50), @area_size VARCHAR(50)
AS
BEGIN
	
	SET NOCOUNT ON;    
	Insert Into [enquiry] (enquiry_type, user_type, first_name, last_name, email, [location], property_type, price, area_size) 
	VALUES(@enquiry_type, @user_type, @first_name, @last_name, @email, @location, @property_type, @price, @area_size); 
	
END


GO
/****** Object:  StoredProcedure [dbo].[sp_add_message]    Script Date: 14/08/2021 22:45:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_add_message]
	@sender VARCHAR(100),
	@receiver VARCHAR(100),
	@advert_id VARCHAR(100),
	@text varchar(500)
AS
BEGIN
	
	SET NOCOUNT ON;    
	Insert Into [Message] (sender, receiver, [text], advert_id) VALUES(@sender, @receiver, @text, @advert_id); 
END
GO
/****** Object:  StoredProcedure [dbo].[sp_add_paylog]    Script Date: 14/08/2021 22:45:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_add_paylog]
	@user_id varchar(100), 
	@amount smallint, 
	@months tinyint, 
	@token varchar(100), 
	@ip varchar(50)
AS
BEGIN
	
	SET NOCOUNT ON;  
	
	Insert Into [PayLog] ([user_id], amount, months, token, [ip]) 
	VALUES(@user_id, @amount, @months, @token, @ip);

END



GO
/****** Object:  StoredProcedure [dbo].[sp_add_sector]    Script Date: 14/08/2021 22:45:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_add_sector]
	@title VARCHAR(50)
AS
BEGIN
	
	SET NOCOUNT ON;    
	Insert Into [Sector] (title) VALUES(replace(@title, ',', '')); -- comma is seperator 
END
GO
/****** Object:  StoredProcedure [dbo].[sp_add_tag]    Script Date: 14/08/2021 22:45:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_add_tag]
	@title VARCHAR(50)
AS
BEGIN
	
	SET NOCOUNT ON;    
	Insert Into [tag] (title) VALUES(replace(@title, ',', ''));  --comma is seperator
END
GO
/****** Object:  StoredProcedure [dbo].[sp_add_user]    Script Date: 14/08/2021 22:45:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_add_user]	
	@fullname  VARCHAR(50), @email  VARCHAR(50), @phone  VARCHAR(50), @avatar  VARCHAR(50), @line1  VARCHAR(50), @line2 VARCHAR(50), @city VARCHAR(50), @postcode VARCHAR(50), @passhash VARCHAR(50)
AS
BEGIN
	
	SET NOCOUNT ON;    
	Insert Into [User] (fullname, email, phone, avatar, line1, line2, city, postcode, passhash) 
    VALUES(@fullname, @email, @phone, @avatar, @line1, @line2, @city, @postcode, @passhash); 
	
END
GO
/****** Object:  StoredProcedure [dbo].[sp_delete_advert]    Script Date: 14/08/2021 22:45:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[sp_delete_advert]
	@id VARCHAR(100)
AS
BEGIN
	
	SET NOCOUNT ON;    
	Delete From [Advert] Where CAST(id AS VARCHAR(100)) = @id
END
GO
/****** Object:  StoredProcedure [dbo].[sp_delete_enquiry]    Script Date: 14/08/2021 22:45:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[sp_delete_enquiry]
	@id VARCHAR(100)
AS
BEGIN
	
	SET NOCOUNT ON;    
	Delete From [enquiry] Where CAST(id AS VARCHAR(100)) = @id
END
GO
/****** Object:  StoredProcedure [dbo].[sp_delete_sector]    Script Date: 14/08/2021 22:45:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_delete_sector]
	@id VARCHAR(100)
AS
BEGIN
	
	SET NOCOUNT ON;    
	Delete From [Sector] Where CAST(id AS VARCHAR(100)) = @id
END
GO
/****** Object:  StoredProcedure [dbo].[sp_delete_tag]    Script Date: 14/08/2021 22:45:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_delete_tag]
	@id VARCHAR(100)
AS
BEGIN
	
	SET NOCOUNT ON;    
	Delete From [tag] Where CAST(id AS VARCHAR(100)) = @id
END
GO
/****** Object:  StoredProcedure [dbo].[sp_reset_password]    Script Date: 14/08/2021 22:45:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[sp_reset_password]
	@email  VARCHAR(50), @passhash  VARCHAR(50)
AS
BEGIN
	
	SET NOCOUNT ON;    
	Update [User] Set passhash = @passhash  WHERE email=@email
END
GO
/****** Object:  StoredProcedure [dbo].[sp_select_adverts]    Script Date: 14/08/2021 22:45:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[sp_select_adverts] 
@MIN_PRICE VARCHAR(10),
@MAX_PRICE VARCHAR(10),
@CITIES VARCHAR(MAX),
@SECTORS VARCHAR(MAX),
@TAGS VARCHAR(MAX),
@TENURES VARCHAR(MAX),
@USER_ID VARCHAR(100)
AS
BEGIN
	
	SET NOCOUNT ON;    
	SELECT ADV.*, 
        
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

		(SELECT ISNULL(T.FULLNAME,'') + '|' + ISNULL(T.EMAIL,'')+ '|' + ISNULL(T.PHONE,'') + '|' + ISNULL(T.AVATAR,'') + '|' + 
		ISNULL(T.LINE1,'') + '|' + ISNULL(T.LINE2,'') + '|' + ISNULL(T.CITY,'') + '|' + ISNULL(T.POSTCODE,'') FROM [USER] AS T
		INNER JOIN [ADVERT] AS A ON T.ID = A.SELLER_ID AND A.ID = ADV.ID) AS SELLER

        FROM [ADVERT] AS ADV

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
                (SELECT COUNT(0) FROM DBO.[User] 
                    WHERE ([role] = 'admin' and CAST(ID AS VARCHAR(100)) = @USER_ID) OR 
                          (@USER_ID = CAST(ADV.SELLER_ID AS VARCHAR(100)))) > 0
            )

        ORDER BY ADV.CREATE_DATE 
END
GO
/****** Object:  StoredProcedure [dbo].[sp_select_adverts_by_id]    Script Date: 14/08/2021 22:45:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[sp_select_adverts_by_id] 
@id VARCHAR(100)
AS
BEGIN
	
	SET NOCOUNT ON;    
	SELECT ADV.*, 
        
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

		(SELECT ISNULL(T.FULLNAME,'') + '|' + ISNULL(T.EMAIL,'')+ '|' + ISNULL(T.PHONE,'') + '|' + ISNULL(T.AVATAR,'') + '|' + 
		ISNULL(T.LINE1,'') + '|' + ISNULL(T.LINE2,'') + '|' + ISNULL(T.CITY,'') + '|' + ISNULL(T.POSTCODE,'') FROM [USER] AS T
		INNER JOIN [ADVERT] AS A ON T.ID = A.SELLER_ID AND A.ID = ADV.ID) AS SELLER

        FROM [ADVERT] AS ADV

	WHERE CAST(ADV.id AS VARCHAR(50)) = @id

END
GO
/****** Object:  StoredProcedure [dbo].[sp_select_adverts_by_page]    Script Date: 14/08/2021 22:45:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_select_adverts_by_page] 
@MIN_PRICE VARCHAR(10),
@MAX_PRICE VARCHAR(10),
@CITIES VARCHAR(MAX),
@SECTORS VARCHAR(MAX),
@TAGS VARCHAR(MAX),
@TENURES VARCHAR(MAX),
@USER_ID VARCHAR(100),
@PAGE TINYINT,
@PAGE_SIZE TINYINT
AS
BEGIN
	
	SET NOCOUNT ON;    
	SELECT ADV.*, 
        
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

		(SELECT ISNULL(T.FULLNAME,'') + '|' + ISNULL(T.EMAIL,'')+ '|' + ISNULL(T.PHONE,'') + '|' + ISNULL(T.AVATAR,'') + '|' + 
		ISNULL(T.LINE1,'') + '|' + ISNULL(T.LINE2,'') + '|' + ISNULL(T.CITY,'') + '|' + ISNULL(T.POSTCODE,'') FROM [USER] AS T
		INNER JOIN [ADVERT] AS A ON T.ID = A.SELLER_ID AND A.ID = ADV.ID) AS SELLER

        FROM [ADVERT] AS ADV

	WHERE 
			(@MIN_PRICE IS NULL OR (ADV.LEASEHOLDPRICE IS NOT NULL AND CAST(ADV.LEASEHOLDPRICE AS INT) >= CAST(@MIN_PRICE AS INT)) OR (ADV.FREEHOLDPRICE IS NOT NULL AND CAST(ADV.FREEHOLDPRICE AS INT) >= CAST(@MIN_PRICE AS INT))) AND
			(@MAX_PRICE IS NULL OR (ADV.LEASEHOLDPRICE IS NOT NULL AND CAST(ADV.LEASEHOLDPRICE AS INT) <= CAST(@MAX_PRICE AS INT)) OR (ADV.FREEHOLDPRICE IS NOT NULL AND CAST(ADV.FREEHOLDPRICE AS INT) <= CAST(@MAX_PRICE AS INT))) AND
			(@CITIES IS NULL OR (ADV.CITY IS NOT NULL AND @CITIES LIKE '%' + ADV.CITY + '%')) AND
			(@SECTORS IS NULL OR
				(SELECT COUNT(0) FROM SECTOR AS T1 INNER JOIN ADVERTSECTOR AS T2 ON T1.ID = T2.SECTOR_ID AND T2.ADVERT_ID = ADV.ID 
				INNER JOIN (SELECT VALUE AS VALUE2 FROM STRING_SPLIT(@SECTORS, ',')) AS V2 ON T1.ID = V2.VALUE2) > 0) AND
			(@TAGS IS NULL OR 
				(SELECT COUNT(0) FROM TAG AS T1 INNER JOIN ADVERTTAG AS T2 ON T1.ID = T2.TAG_ID AND T2.ADVERT_ID = ADV.ID 
				INNER JOIN (SELECT VALUE AS VALUE2 FROM STRING_SPLIT(@TAGS, ',')) AS V2 ON T1.ID = V2.VALUE2) > 0) AND
			(@TENURES IS NULL OR
				(SELECT COUNT(0) FROM TENURE AS T1 INNER JOIN ADVERTTENURE AS T2 ON T1.ID = T2.TENURE_ID AND T2.ADVERT_ID = ADV.ID 
				INNER JOIN (SELECT VALUE AS VALUE2 FROM STRING_SPLIT(@TENURES, ',')) AS V2 ON T1.TITLE = V2.VALUE2) > 0) 
				AND
            (@USER_ID IS NULL OR 
                (SELECT COUNT(0) FROM DBO.[User] 
                    WHERE ([role] = 'admin' and CAST(ID AS VARCHAR(100)) = @USER_ID) OR 
                          (@USER_ID = CAST(ADV.SELLER_ID AS VARCHAR(100)))) > 0
            )

     ORDER BY ADV.CREATE_DATE DESC
	 OFFSET(@PAGE-1) * @PAGE_SIZE ROWS FETCH NEXT @PAGE_SIZE ROWS ONLY

END
GO
/****** Object:  StoredProcedure [dbo].[sp_select_contents]    Script Date: 14/08/2021 22:45:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_select_contents] 
AS
BEGIN
	
	SET NOCOUNT ON;    
	Select TOP 1 * From [Content]
END
GO
/****** Object:  StoredProcedure [dbo].[sp_select_enquiries]    Script Date: 14/08/2021 22:45:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_select_enquiries] 
AS
BEGIN
	
	SET NOCOUNT ON;    
	SELECT * FROM [enquiry] AS T ORDER BY T.create_Date desc
END
GO
/****** Object:  StoredProcedure [dbo].[sp_select_messages]    Script Date: 14/08/2021 22:45:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_select_messages] 
@user_id varchar(100)
AS
BEGIN
	
	SET NOCOUNT ON;    
	SELECT T.*, T2.title, T3.fullname AS Sender_Name, t4.fullname as Receiver_Name FROM [Message] AS T 
		LEFT JOIN Advert AS T2 on t.advert_id = T2.id 
		LEFT JOIN [User] AS T3 ON T.sender = T3.id
		LEFT JOIN [User] AS T4 ON T.receiver = T4.id
	where cast(sender as varchar(100)) = @user_id or cast(receiver as varchar(100)) = @user_id  
	ORDER BY T.create_date desc
END
GO
/****** Object:  StoredProcedure [dbo].[sp_select_paylog_by_id]    Script Date: 14/08/2021 22:45:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[sp_select_paylog_by_id]
	@id VARCHAR(100)
AS
BEGIN
	
	SET NOCOUNT ON;    
	SELECT * FROM [PayLog] AS T WHERE CAST(T.ID AS VARCHAR(50)) = @id
END
GO
/****** Object:  StoredProcedure [dbo].[sp_select_sector_by_id]    Script Date: 14/08/2021 22:45:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_select_sector_by_id]
	@id VARCHAR(100)
AS
BEGIN
	
	SET NOCOUNT ON;    
	SELECT * FROM [SECTOR] AS T WHERE CAST(T.ID AS VARCHAR(50)) = @id
END
GO
/****** Object:  StoredProcedure [dbo].[sp_select_sectors]    Script Date: 14/08/2021 22:45:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_select_sectors] 
AS
BEGIN
	
	SET NOCOUNT ON;    
	SELECT * FROM [Sector] AS T ORDER BY T.title
END
GO
/****** Object:  StoredProcedure [dbo].[sp_select_sectors_by_page]    Script Date: 14/08/2021 22:45:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_select_sectors_by_page] 
	@PAGE TINYINT,
	@PAGE_SIZE TINYINT
AS
BEGIN
	
	SET NOCOUNT ON;    
	SELECT * FROM [Sector] AS T ORDER BY T.title OFFSET(@PAGE-1) * @PAGE_SIZE ROWS FETCH NEXT @PAGE_SIZE ROWS ONLY
END
GO
/****** Object:  StoredProcedure [dbo].[sp_select_tag_by_id]    Script Date: 14/08/2021 22:45:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_select_tag_by_id]
	@id VARCHAR(100)
AS
BEGIN
	
	SET NOCOUNT ON;    
	SELECT * FROM [tag] AS T WHERE CAST(T.ID AS VARCHAR(50)) = @id
END
GO
/****** Object:  StoredProcedure [dbo].[sp_select_tags]    Script Date: 14/08/2021 22:45:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_select_tags] 
AS
BEGIN
	
	SET NOCOUNT ON;    
	SELECT * FROM [tag] AS T ORDER BY T.title
END
GO
/****** Object:  StoredProcedure [dbo].[sp_select_tags_by_page]    Script Date: 14/08/2021 22:45:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_select_tags_by_page] 
	@PAGE TINYINT,
	@PAGE_SIZE TINYINT
AS
BEGIN
	
	SET NOCOUNT ON;    
	SELECT * FROM [tag] AS T ORDER BY T.title OFFSET(@PAGE-1) * @PAGE_SIZE ROWS FETCH NEXT @PAGE_SIZE ROWS ONLY
END
GO
/****** Object:  StoredProcedure [dbo].[sp_select_user_by_creds]    Script Date: 14/08/2021 22:45:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[sp_select_user_by_creds]
	@email VARCHAR(100),	
	@passhash VARCHAR(100)
AS
BEGIN
	
	SET NOCOUNT ON;    
	SELECT TOP 1 * FROM [User] WHERE [email]=@email AND passhash=@passhash
END
GO
/****** Object:  StoredProcedure [dbo].[sp_select_user_by_id]    Script Date: 14/08/2021 22:45:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[sp_select_user_by_id]
	@id VARCHAR(100)
AS
BEGIN
	
	SET NOCOUNT ON;    
	SELECT * FROM [User] AS T WHERE CAST(T.id AS VARCHAR(50)) = @id
END
GO
/****** Object:  StoredProcedure [dbo].[sp_select_users]    Script Date: 14/08/2021 22:45:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[sp_select_users] 
AS
BEGIN
	
	SET NOCOUNT ON;    
	SELECT * FROM [User] AS T ORDER BY T.fullname
END
GO
/****** Object:  StoredProcedure [dbo].[sp_select_users_by_page]    Script Date: 14/08/2021 22:45:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[sp_select_users_by_page] 
	@PAGE TINYINT,
	@PAGE_SIZE TINYINT
AS
BEGIN
	
	SET NOCOUNT ON;    
	SELECT * FROM [User] AS T ORDER BY T.fullname OFFSET(@PAGE-1) * @PAGE_SIZE ROWS FETCH NEXT @PAGE_SIZE ROWS ONLY
END
GO
/****** Object:  StoredProcedure [dbo].[sp_update_advert]    Script Date: 14/08/2021 22:45:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_update_advert]
	@id VARCHAR(100),
	@seller_id varchar(100)
,@title varchar(500)
,@description varchar(max)
,@status varchar(100)
,@freeHoldPrice varchar(10)
,@leaseHoldPrice varchar(10)
,@weeklyProfit varchar(10)
,@monthlyProfit varchar(10)
,@annualProfit varchar(10)
,@weeklyTurnover varchar(10)
,@monthlyTurnover varchar(10)
,@annualTurnover varchar(10)
,@line1 varchar(100)
,@line2 varchar(100)
,@city varchar(100)
,@postcode varchar(10)
,@images varchar(max)
AS
BEGIN
	
	SET NOCOUNT ON;    
	Update [Advert] Set 
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
      WHERE CAST(id AS VARCHAR(100)) = @id
END
GO
/****** Object:  StoredProcedure [dbo].[sp_update_advert_dependencies]    Script Date: 14/08/2021 22:45:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_update_advert_dependencies]
	@advert_id VARCHAR(100),
	@sectors VARCHAR(max),
	@tags VARCHAR(max),
	@tenures VARCHAR(100)
AS
BEGIN
	
	SET NOCOUNT ON;    
	delete from advertsector where CAST(advert_id AS VARCHAR(100)) = @advert_id;
    delete from adverttag where CAST(advert_id AS VARCHAR(100)) = @advert_id;
    delete from adverttenure where CAST(advert_id AS VARCHAR(100)) = @advert_id;

	if @sectors is not null and len(@sectors) > 0
	begin
		insert into advertsector(advert_id, sector_id) 
		SELECT @advert_id, value FROM STRING_SPLIT(@sectors, ',') AS T1
	end

	if @tags is not null and len(@tags) > 0
	begin
		insert into adverttag(advert_id, tag_id) 
		SELECT @advert_id, value FROM STRING_SPLIT(@tags, ',') AS T1
	end
	
	if @tenures is not null and len(@tenures) > 0
	begin
		insert into AdvertTenure(advert_id, tenure_id) 
		SELECT @advert_id, T2.id FROM STRING_SPLIT(@tenures, ',') AS T1
		INNER JOIN Tenure AS T2 ON T1.value = T2.title;
	end

END
GO
/****** Object:  StoredProcedure [dbo].[sp_update_content]    Script Date: 14/08/2021 22:45:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_update_content]
@about varchar(max),
@terms varchar(max),
@address varchar(500),
@phone varchar(100),
@email varchar(100),
@facebook varchar(200),
@twitter varchar(200),
@linkedin varchar(200),
@instagram varchar(200),
@youtube varchar(200)
AS
BEGIN
	
	SET NOCOUNT ON;    
		Update [Content] Set 
            [about] = @about,
            [terms] = @terms,
            [address] = @address,
            [phone] = @phone,
            [email] = @email,
            [facebook] = @facebook,
            [twitter] = @twitter,
            [linkedin] = @linkedin,
            [instagram] = @instagram,
            [youtube] = @youtube 
		WHERE id = (SELECT TOP 1 id FROM [Content])
END
GO
/****** Object:  StoredProcedure [dbo].[sp_update_paylog]    Script Date: 14/08/2021 22:45:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_update_paylog]
	@user_id VARCHAR(100),
	@token VARCHAR(100),
	@status VARCHAR(50),
	@id uniqueidentifier output
AS
BEGIN
	
	SET NOCOUNT ON;    

	Update [Paylog] Set 
		update_date = getdate(),
		[status] = @status
	WHERE CAST([user_id] AS VARCHAR(100)) = @user_id and token = @token
	and update_date is null --update only once

	select @id=id from paylog WHERE CAST([user_id] AS VARCHAR(100)) = @user_id and token = @token

END
GO
/****** Object:  StoredProcedure [dbo].[sp_update_sector]    Script Date: 14/08/2021 22:45:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_update_sector]
	@id VARCHAR(100),
	@title VARCHAR(50)
AS
BEGIN
	
	SET NOCOUNT ON;    
	Update [Sector] Set title=@title WHERE CAST(id AS VARCHAR(100)) = @id
END
GO
/****** Object:  StoredProcedure [dbo].[sp_update_seen_messages]    Script Date: 14/08/2021 22:45:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[sp_update_seen_messages]
	@receiver varchar(100)
AS
BEGIN
	
	SET NOCOUNT ON;    
	Update [Message] Set seen=1 WHERE CAST(receiver AS VARCHAR(100)) = @receiver
END
GO
/****** Object:  StoredProcedure [dbo].[sp_update_tag]    Script Date: 14/08/2021 22:45:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_update_tag]
	@id VARCHAR(100),
	@title VARCHAR(50)
AS
BEGIN
	
	SET NOCOUNT ON;    
	Update [tag] Set title=@title WHERE CAST(id AS VARCHAR(100)) = @id
END
GO
/****** Object:  StoredProcedure [dbo].[sp_update_user]    Script Date: 14/08/2021 22:45:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_update_user]
	@id VARCHAR(100),
	@fullname  VARCHAR(50), 
	--@email  VARCHAR(50), DONT UPDATE EMAIL
	@phone  VARCHAR(50), 
	@avatar  VARCHAR(50), 
	@line1  VARCHAR(50), 
	@line2 VARCHAR(50), 
	@city VARCHAR(50), 
	@postcode VARCHAR(50)
AS
BEGIN
	
	SET NOCOUNT ON;    
	Update [User] Set 
            fullname=@fullname, 
            --email=@email, 
            phone=@phone, 
            avatar=@avatar, 
            line1=@line1, 
            line2=@line2, 
            city=@city, 
            postcode=@postcode
    WHERE CAST(id AS VARCHAR(50)) = @id
END
GO
/****** Object:  StoredProcedure [dbo].[sp_update_user_active]    Script Date: 14/08/2021 22:45:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[sp_update_user_active]
	@id VARCHAR(100),
	@active BIT
AS
BEGIN
	
	SET NOCOUNT ON;    
	UPDATE [USER] SET ACTIVE = @ACTIVE WHERE CAST(ID AS VARCHAR(100)) = @ID
END
GO
/****** Object:  StoredProcedure [dbo].[sp_upgrade_user]    Script Date: 14/08/2021 22:45:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_upgrade_user]
	@user_id VARCHAR(100),
	@paylog_id VARCHAR(100),
	@months tinyint
AS
BEGIN	
	SET NOCOUNT ON;    
	Insert Into [UpgradeLog] ([user_id], [paylog_id], prev_role, prev_seller_until) SELECT top 1 @user_id, @paylog_id, [role], seller_until from [User] where cast(id as varchar(100)) = @user_id

	UPDATE [User]
	SET [role] = 'seller', 
	seller_until = DATEADD(month, @months, getdate())
	where cast(id as varchar(100)) = @user_id

END
GO
