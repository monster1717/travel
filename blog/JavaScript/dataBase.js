$(function(){
	var dataList = null;
	var db = openDatabase('MyData','','My Database',102400);
	function init(){
		showAllData();

	}

	function showData(data){
		console.log(data);
	}

	function showAllData(){
		db.transaction(function(tx){
			
			tx.executeSql("SELECT * FROM MsgData",[],function(tx,rs){
				/*一些操作*/

				var data = {
					status:200,
					msg:"ok",
					data:{}

				}


				for(var i=0;i<rs.rows.length;i++){

					data.data[i] = rs.rows.item(i);
					
				}
				showData(data);
			});
		});
	}

	function addData(name,message,email,Meme,time){
  		
		db.transaction(function(tx){
			tx.executeSql("CREATE TABLE IF NOT EXISTS MsgData(name TEXT,message TEXT,email TEXT,Meme TEXT,time INTEGER)",[]);
			tx.executeSql("INSERT INTO MsgData VALUES(?,?,?,?,?)",[name,message,email,Meme,time],function(tx,rs){
				alert("成功保存数据");
			},function(tx,error){
				alert(error.source + "::" + error.message);
			});
		});

	}

	function savaData(){
		var name = $(".pername").val();
		var message = $(".writePanel").val();
		var email = $(".emailURL").val();
		var Meme = $(".weiboURL").val();
		var time = new Date().toLocaleString();
		console.log(name,message,email,Meme,time);
		addData(name,message,email,Meme,time);
		showAllData();
	}

	$(".save").click(function(){
		savaData();
	})

	function removeAllData(){
		db.transaction(function(tx){
			tx.executeSql("DELETE FROM MsgData",[],function(tx,res){
				alert("删除成功");
			},function(tx,err){
				alert("删除失败"+err.message);
			});
		})
	}

	function removeData(index){
		db.transaction(function(tx){
			tx.executeSql("DELETE FROM MsgData WHERE rowid = " + index,[],function(tx,res){
				alert("删除数据成功");
			},function(tx,err){
				alert("删除数据失败"+err.message);
			});
		})
	}

	function updateData(){
		db.transaction(function(tx){
			tx.executeSql("ALTER TABLE MsgData ENABLE ROW MOVEMENT",[],function(tx,res){
				alert("刷新成功");
			},function(tx,err){
				alert("刷新失败"+err.message);
			})
		})
	}

	$(".delete").bind("click",function(){
		console.log($(".delete").index(this));
		var deleteNum = $(".delete").index(this) + 3;
		updateData();
		removeData(deleteNum);
		
		/*删除时rowid未发生变化，因为当删除记录时，该行的上下文记录不变，但是row上删除了数据，并且标记上“D”，当插入的数据的占用空间小于原有空间时，会清除该物理地址，在插入下一条占用空间小于原有空间的数据时，rowid会被重用*/
	})

	// window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
	// window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
	// window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
	// window.IDBCursor = window.IDBCursor || window.webkitIDBCursor || window.msIDBCursor;

	// function CreateObjectStore(){
	// 	var dbName = 'indexedDBTest';/*数据库名*/
	// 	var dbVersion = 20160608;
	// 	var idb;

	// 	/*链接数据库，dbConnect对象为一个IDBOpenDBRequst对象，代表数据库连接的请求对象*/
	// 	var dbConnect = indexedDB.open(dbName,dbVersion);

	// 	dbConnect.onsuccess = function(e){

	// 		idb = e.target.result;
	// 		alert("连接数据库成功");
	// 	};
	// 	dbConnect.onerror = function(){
	// 		alert("数据库连接失败");
	// 	};
	// 	dbConnect.onuppradeneeded = function(e){
	// 		//数据库版本更新
	// 		//e.target.transition属性值为一个IDBTransaction事物对象，代表连接成功地数据库对象
	// 		idb = e.target.result;
	// 		/*e.target.transaction属性值为一个IDBTransaction事物对象，此处代表版本更新事物*/
	// 		var tx = e.target.transaction;
	// 		var name = 'newUsers';
	// 		var optionalParameters = {
	// 			keyPath: 'userId',
	// 			autoIncrement:false
	// 		};
	// 		var store = idb.CreateObjectStore(name,optionalParameters);
	// 		alert("对象数据库创建成功");

	// 		var name = 'userNameIndex';
	// 		var keyPath = 'userName';
	// 		var optionalParameters = {
	// 			unique:false,
	// 			multiEntry:false
	// 		};

	// 		var idx = store.createIndex(name,keyPath,optionalParameters);
	// 		alert("索引创建成功");
	// 	};

	// 	saveData();
	// }

	// CreateObjectStore();

	// function saveData(){
	// 	var dbName = 'indexedDBTest';
	// 	var dbVersion = 20160608;
	// 	var dbConnect = indexedDB.open(dbName,dbVersion);
	// 	dbConnect.onsuccess = function(e){
	// 		idb = e.target.result;

	// 		//开启事务
	// 		var tx = idb.transaction(['Users'],"readwrite");
	// 		var store = tx.objectStore('Users');
	// 		var value = {
	// 			userId:1,
	// 			userName:'张三',
	// 			address:'住址1'
	// 		}

	// 		var req = store.put(value);
	// 		req.onsuccess = function(e){
	// 			alert("数据库保存成功");

	// 		};
	// 		req.onerror = function(e){
	// 			alert("数据库保存失败");
	// 		};
	// 	};
	// 	dbConnect.onerror = function(e){
	// 		alert("数据库连接失败");

	// 	};
	// };

	// function GetData(){
	// 	var dbName = 'indexedDBTest';
	// 	var dbVersion = "20160608";
	// 	var idb;

	// 	var dbConnect = indexedDB.open(dbName,dbVersion);

	// 	dbConnect.onsuccess = function(e){
	// 		idb = e.target.result;
	// 		var tx = idb.transaction(['Users'],"readonly");
	// 		var store = tx.objectStore('Users');
	// 		var range = IDBKeyRange.bound(1,4);
	// 		var direction = "next";
	// 		var req = store.openCursor(range.direction);
	// 		req.onsuccess = function(){
	// 			var cursor = this.result;
	// 			if(cursor){
	// 				if(cursor){
	// 					/*检索到数据*/
	// 					cursor.continue();
	// 				}else{
	// 					/*检索结束*/
	// 				}
	// 			}
	// 		}
	// 		req.onerror = function(){
	// 			alert("检索失败");
	// 		}
	// 	}




	// }


})