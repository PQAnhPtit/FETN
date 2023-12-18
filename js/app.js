var domain = "http://localhost:7700"
var domain_cate = "http://localhost:7715"
var domain_doc = "http://localhost:7716"
var domain_com = "http://localhost:7702"


function getAllUser() {
    apiUrl = domain + "/user"
    fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(datas => {
            var listUser = document.querySelector('#list_user');
            var content = datas.map(function(user) {
                return `<tr>
				<td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.password}</td>
                <td>${user.address}</td>
                <td>${user.phone_number}</td>
				<td>
				   <a class="btn btn-block btn-warning btn-sm" href="/19.9.2023/templatenew/admin/user/edit.html?id=${user.id}">Edit</a>
                            <Button onclick="deleteUser(${user.id})"
                               class="btn btn-block btn-danger btn-sm"
                               onclick="return confirm('Are you sure want to delete it?')">Delete</Button>
				</td>
				</tr>`;
            });
            listUser.innerHTML = content.join('');
        })
        .catch(error => console.error(error));
}

function deleteUser(id) {
    fetch(domain + '/user/' + id, {
            method: 'DELETE'
        })
        .then(function(response) {
            if (response.ok) {
                alert("User deleted successfully!");
                location.reload();
            } else {
                throw new Error('Response not OK');
            }
        })
        .catch(function(error) {
            alert("Error: " + error.message);
        });
}

function createUser() {
    var name = document.querySelector('input[name="name"]').value
    var email = document.querySelector('input[name="email"]').value
	var pass_word = document.querySelector('input[name="password"]').value
	var address = document.querySelector('input[name="address"]').value
	var phone_number = document.querySelector('input[name="phone_number"]').value
    var user = {
        "name": name,
        "email": email,
        "password": pass_word,
        "address": address,
        "phone_number": phone_number
    };
	
    apiUrl = domain + "/user";
    fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(function(response) {
            if (response.ok) {
                alert("User add successfully!");
                location.reload();
            } else {
                alert('Response not OK');
                location.reload();
            }
        })
        .catch(function(error) {
            alert("Error: " + error.message);
        });
}

function getUser() {
	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get('id');
    apiUrl = domain + "/user/" + id;
    fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            var listUser = document.querySelector('#demo');
             var content = `<div class="form-group">
                            <label>Name</label>
                            <input type="text" class="form-control" id="name" name="name" 
                                   required value="${data.name}">
                            <span class="form-message"></span>
                        </div>
						
						<input type="hidden" id="userId" name="userId" value="${data.id}">

                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" id="email" name="email" 
                                    class="form-control" required value="${data.email}">
                            <span class="form-message"></span>
                        </div>
						
						<div class="form-group">
                            <label>Password</label>
                            <input type="password" class="form-control" id="password" name="password" 
                                   required value="${data.password}">
                            <span class="form-message"></span>
                        </div>

                        <div class="form-group">
                            <label>Address</label>
                            <input type="text" id="address" name="address" 
                                    class="form-control"  required value="${data.address}">
                            <span class="form-message"></span>
                        </div>
						
						<div class="form-group">
                            <label>Phone Number</label>
                            <input type="text" id="phone_number" name="phone_number" 
                                   class="form-control" required value="${data.phone_number}">
                            <span class="form-message"></span>
                        </div>`;
			listUser.innerHTML = content;		
        })
        .catch(error => console.error(error));
}

function updateUser() {
	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get('id');
    var name = document.querySelector('input[name="name"]').value
    var email = document.querySelector('input[name="email"]').value
	var pass_word = document.querySelector('input[name="password"]').value
	var address = document.querySelector('input[name="address"]').value
	var phone_number = document.querySelector('input[name="phone_number"]').value
    var user = {
		"id": id,
        "name": name,
        "email": email,
        "password": pass_word,
        "address": address,
        "phone_number": phone_number
    };
	
    apiUrl = domain + "/user/" + id;
    fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(function(response) {
            if (response.ok) {
                alert("User Update successfully!");
                location.reload();
            } else {
                alert('Response not OK');
                location.reload();
            }
        })
        .catch(function(error) {
            alert("Error: " + error.message);
        });
}


function login() {
    var email = document.querySelector('input[name="email"]').value
	var password = document.querySelector('input[name="password"]').value
	
	
    apiUrl = domain + "/login-user/" + email + "/" + password;
    fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(function(response) {
            if (response.ok) {
                alert("Login successfully!");
                location.replace("/19.9.2023/templatenew/index.html");
            } else {
                alert('Response not OK');
                location.reload();
            }
			return response.json();
        })
		.then(function(data){
			var abc = data.id
			localStorage.setItem("user", abc);
		})
        .catch(function(error) {
            alert("Error: " + error.message);
        });
}

function register() {
    var name = document.querySelector('input[name="name"]').value
    var email = document.querySelector('input[name="email"]').value
	var pass_word = document.querySelector('input[name="password"]').value
	var address = document.querySelector('input[name="address"]').value
	var phone_number = document.querySelector('input[name="phone_number"]').value
    var user = {
        "name": name,
        "email": email,
        "password": pass_word,
        "address": address,
        "phone_number": phone_number
    };
	
	
    apiUrl = domain + "/register";
    fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
			body: JSON.stringify(user)
        })
        .then(function(response) {
            if (response.ok) {
                alert("Register successfully!");
                location.replace("/19.9.2023/templatenew/web/user/login.html");
            } else {
                alert('Response not OK');
                location.reload();
            }
        })
        .catch(function(error) {
            alert("Error: " + error.message);
        });
}

function handleLogin(){
	var userId = localStorage.getItem("user");
	var listUser = document.querySelector('#hllogin');
	if(userId == null){
		var content = `
        <a href="/19.9.2023/templatenew/web/user/login.html" class="my-auto">
			Login		
        </a>`
		listUser.innerHTML = content;
	}else{
		var content = `
		<a href="/19.9.2023/templatenew/web/user/information.html" class="my-auto">
			<i class="fas fa-user fa-2x"></i>		
        </a>`
		listUser.innerHTML = content;
	}
}

function information_user(){
	var userId = localStorage.getItem("user");
	apiUrl = domain + "/user/" + userId;
    fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            var listUser = document.querySelector('#personal');
            var content = `
			<div class="p-5 bg-light rounded">
												<div class="row g-4">
													<div class="col-12">
														<div class="text-center mx-auto" style="max-width: 700px;">
															<h3 class="text-primary">Information User</h1>                        
														</div>
													</div>
													<div class="col-lg-12">
														<div class="row">
															<div class="col-md-12 col-lg-6">
																<div class="form-item w-100">
																	<label class="form-label my-3">Tên:</label>
																</div>
															</div>
															<div class="col-md-12 col-lg-6">
																<div class="form-item w-100">
																	 <label class="form-label my-3">${data.name}</label>                    
																</div>
															</div>
														</div>
														
														<div class="row">
															<div class="col-md-12 col-lg-6">
																<div class="form-item w-100">
																	<label class="form-label my-3">Email:</label>
																</div>
															</div>
															<div class="col-md-12 col-lg-6">
																<div class="form-item w-100">
																	 <label class="form-label my-3">${data.email}</label>                    
																</div>
															</div>
														</div>
														
														<div class="row">
															<div class="col-md-12 col-lg-6">
																<div class="form-item w-100">
																	<label class="form-label my-3">Address:</label>
																</div>
															</div>
															<div class="col-md-12 col-lg-6">
																<div class="form-item w-100">
																	 <label class="form-label my-3">${data.address}</label>                    
																</div>
															</div>
														</div>
														
														<div class="row">
															<div class="col-md-12 col-lg-6">
																<div class="form-item w-100">
																	<label class="form-label my-3">Phone Number:</label>
																</div>
															</div>
															<div class="col-md-12 col-lg-6">
																<div class="form-item w-100">
																	 <label class="form-label my-3">${data.phone_number}</label>                    
																</div>
															</div>
														</div>
														<br><br>
														<a href="/19.9.2023/templatenew/web/user/login.html" type="button" class="btn btn-danger" style="margin-right: 30px; margin-top: 0px;" onclick="logout()">Logout</a>
													</div>
												</div>
											</div>
			`;
			listUser.innerHTML = content;		
        })
        .catch(error => console.error(error));
}

function logout(){
	localStorage.removeItem("user");
}


function sidebarUser(){
	var userId = localStorage.getItem("user");
	var listUser = document.querySelector('#sidebar');
	content = `
	    <div class="mb-2">
            <a href="/19.9.2023/templatenew/web/user/edit-user.html?id=${userId}">Sửa thông tin cá nhân</a>
        </div>
		<div class="mb-2">
            <a href="/19.9.2023/templatenew/web/user/doi-pass.html?id=${userId}">Thay đổi mật khẩu</a>
        </div>`
	listUser.innerHTML = content;
}

function getUserInformation() {
	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get('id');
    apiUrl = domain + "/user/" + id;
    fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            var listUser = document.querySelector('#edit-user-information');
            var content = `
			<div class="p-5 bg-light rounded">
				<div class="row g-4">
					<div class="col-12">
						<div class="text-center mx-auto" style="max-width: 700px;">
							<h3 class="text-primary">Edit User</h1>                        
						</div>
					</div>
					<div class="col-lg-12">
						<div class="form-item">
                            <label class="form-label my-3">Name</label>
                            <input type="text" class="form-control" id="name" name="name" 
                                   required value="${data.name}">
                            <span class="form-message"></span>
                        </div>
						
						<input type="hidden" id="id" name="id" value="${data.id}">
						<input type="hidden" id="email" name="email" value="${data.email}">
						<input type="hidden" id="password" name="password" value="${data.password}">

                        <div class="form-itemp">
                            <label class="form-label my-3">Address</label>
                            <input type="text" id="address" name="address" 
                                   class="form-control" required value="${data.address}">
                            <span class="form-message"></span>
                        </div>

                        <div class="form-item">
                            <label class="form-label my-3">Phone Number</label>
                            <input type="text" id="phone_number" name="phone_number" 
                                   required value="${data.phone_number}" class="form-control">
                            <span class="form-message"></span>
                        </div>
                        <br>

						<div class="card-footer">
							<button type="submit" class="btn btn-primary" onclick="updateUser()">Submit</button>
						</div>
					</div>
				</div>
			</div>`;
			listUser.innerHTML = content;		
        })
        .catch(error => console.error(error));
}

function doiPass() {
	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get('id');
    apiUrl = domain + "/user/" + id;
    fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            var listUser = document.querySelector('#doi-pass');
             var content = `
			 <div class="p-5 bg-light rounded">
				<div class="row g-4">
					<div class="col-12">
						<div class="text-center mx-auto" style="max-width: 700px;">
							<h3 class="text-primary">Change Pass</h1>                        
						</div>
					</div>
					<div class="col-lg-12">
						<input type="hidden" id="id" name="id" value="${data.id}">
						<input type="hidden" id="name" name="name" value="${data.name}">
						<input type="hidden" id="email" name="email" value="${data.email}">
						<input type="hidden" id="address" name="address" value="${data.address}">
						<input type="hidden" id="phone_number" name="phone_number" value="${data.phone_number}">
                        <div class="form-item">
                            <label class="form-label my-3">Old Password</label>
                            <input type="password" class="form-control" name="password1"
                                   placeholder="Enter the old password" required>
                            <span class="form-message"></span>
                        </div>

                        <div class="form-item">
                            <label class="form-label my-3">New Password</label>
                            <input type="password" class="form-control" name="password2"
                                   placeholder="Enter the new password" required>
                            <span class="form-message"></span>
                        </div><br>
						<div class="card-footer">
                            <button type="submit" class="btn btn-primary" onclick="doiPassUser()">Submit</button>
                        </div>
					</div>
				</div>
			</div>`;
			listUser.innerHTML = content;		
        })
        .catch(error => console.error(error));
}

function doiPassUser() {
	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get('id');
    var name = document.querySelector('input[name="name"]').value
    var email = document.querySelector('input[name="email"]').value
	var pass_word = document.querySelector('input[name="password2"]').value
	var address = document.querySelector('input[name="address"]').value
	var phone_number = document.querySelector('input[name="phone_number"]').value
    var user = {
		"id": id,
        "name": name,
        "email": email,
        "password": pass_word,
        "address": address,
        "phone_number": phone_number
    };
	
    apiUrl = domain + "/user/" + id;
    fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(function(response) {
            if (response.ok) {
                alert("Change Password successfully!");
                location.replace("/19.9.2023/templatenew/web/user/information.html");
            } else {
                alert('Response not OK');
                location.reload();
            }
        })
        .catch(function(error) {
            alert("Error: " + error.message);
        });
}

function handleMyPage(){
	var userId = localStorage.getItem("user");
	var listUser = document.querySelector('#my-page');
	var content = `
		 <a class="navbar-bar-item navbar-button navbar-hide-small barex bar-item-hover navbar-padding-24" 
		   href="/19.9.2023/templatenew/web/user/my-page.html?id=${userId}" title="my_page">My Page</a>`
	listUser.innerHTML = content;
}






function getAllCategory() {
    apiUrl = domain_cate + "/category"
    fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(datas => {
            var listUser = document.querySelector('#list_user');
            var content = datas.map(function(category) {
                return `<tr>
				<td>${category.id}</td>
                <td>${category.name}</td>
				<td>
				   <a class="btn btn-block btn-warning btn-sm" href="/19.9.2023/templatenew/admin/category/edit.html?id=${category.id}">Edit</a>
                            <Button onclick="deleteCategory(${category.id})"
                               class="btn btn-block btn-danger btn-sm"
                               onclick="return confirm('Are you sure want to delete it?')">Delete</Button>
				</td>
				</tr>`;
            });
            listUser.innerHTML = content.join('');
        })
        .catch(error => console.error(error));
}


function deleteCategory(id) {
    fetch(domain_cate + '/category/' + id, {
            method: 'DELETE'
        })
        .then(function(response) {
            if (response.ok) {
                alert("Category deleted successfully!");
                location.reload();
            } else {
                throw new Error('Response not OK');
            }
        })
        .catch(function(error) {
            alert("Error: " + error.message);
        });
}

function createCategory() {
    var name = document.querySelector('input[name="name"]').value
    var user = {
        "name": name
    };
	
    apiUrl = domain_cate + "/category";
    fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(function(response) {
            if (response.ok) {
                alert("Category add successfully!");
                location.replace("/19.9.2023/templatenew/admin/category/list.html");
            } else {
                alert('Response not OK');
                location.reload();
            }
        })
        .catch(function(error) {
            alert("Error: " + error.message);
        });
}

function getCategory() {
	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get('id');
    apiUrl = domain_cate + "/category/" + id;
    fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            var listUser = document.querySelector('#demo');
             var content = `<div class="form-group">
                            <label>Name</label>
                            <input type="text" class="form-control" id="name" name="name" 
                                   required value="${data.name}">
                            <span class="form-message"></span>
                        </div>
						
						<input type="hidden" id="id" name="id" value="${data.id}">
                       `;
			listUser.innerHTML = content;		
        })
        .catch(error => console.error(error));
}

function updateCategory() {
	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get('id');
    var name = document.querySelector('input[name="name"]').value
    var category = {
		"id": id,
        "name": name
    };
	
    apiUrl = domain_cate + "/category/" + id;
    fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(category)
        })
        .then(function(response) {
            if (response.ok) {
                alert("Category Update successfully!");
                location.replace("/19.9.2023/templatenew/admin/category/list.html");
            } else {
                alert('Response not OK');
                location.reload();
            }
        })
        .catch(function(error) {
            alert("Error: " + error.message);
        });
}

function navbarCate() {
    apiUrl = domain_cate + "/category"
    fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(datas => {
            var listUser = document.querySelector('#listCategory');
            var content = datas.map(function(category) {
                return `<a href="/19.9.2023/templatenew/web/document/khoTaiLieu.html?id=${category.id}" 
				class="dropdown-item">${category.name}</a>`;
            });
            listUser.innerHTML = content.join('');
        })
        .catch(error => console.error(error));
}

function getAllDocument() {
    apiUrl = domain_doc + "/document"
    fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(datas => {
            var listUser = document.querySelector('#list_user');
            var content = datas.map(function(user) {
                return `<tr>
				<td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.description}</td>
                <td>${user.link}</td>
				<td>
				   <a class="btn btn-block btn-warning btn-sm" href="/19.9.2023/templatenew/admin/document/edit.html?id=${user.id}">Edit</a>
                            <Button onclick="deleteDocument(${user.id})"
                               class="btn btn-block btn-danger btn-sm"
                               onclick="return confirm('Are you sure want to delete it?')">Delete</Button>
				</td>
				</tr>`;
            });
            listUser.innerHTML = content.join('');
        })
        .catch(error => console.error(error));
}

function deleteDocument(id) {
    fetch(domain_doc + '/document/' + id, {
            method: 'DELETE'
        })
        .then(function(response) {
            if (response.ok) {
                alert("Document deleted successfully!");
                location.reload();
            } else {
                throw new Error('Response not OK');
            }
        })
        .catch(function(error) {
            alert("Error: " + error.message);
        });
}

function deleteCategoryDocument(id) {
    fetch(domain_doc + '/category-document/' + id, {
            method: 'DELETE'
        })
        .then(function(response) {
            if (response.ok) {
                alert("CategoryDocument deleted successfully!");
                location.reload();
            } else {
                throw new Error('Response not OK');
            }
        })
        .catch(function(error) {
            alert("Error: " + error.message);
        });
}


function createDocument() {
    var name = document.querySelector('input[name="name"]').value
	var description = document.querySelector('input[name="description"]').value
	var link = document.querySelector('input[name="link"]').value
    var user = {
        "name": name,
		"description": description,
		"link": link
    };
	
    apiUrl = domain_doc + "/document";
    fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(function(response) {
            if (response.ok) {
                alert("Document add successfully!");
                location.replace("/19.9.2023/templatenew/admin/document/list.html");
            } else {
                alert('Response not OK');
                location.reload();
            }
        })
        .catch(function(error) {
            alert("Error: " + error.message);
        });
}

function getDocument() {
	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get('id');
    apiUrl = domain_doc + "/document/" + id;
    fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            var listUser = document.querySelector('#demo');
             var content = `<div class="form-group">
                            <label>Name</label>
                            <input type="text" class="form-control" id="name" name="name" 
                                   required value="${data.name}">
                            <span class="form-message"></span>
                        </div>
						
						<div class="form-group">
                            <label>Description</label>
                            <input type="text" class="form-control" id="description" name="description" 
                                   required value="${data.description}">
                            <span class="form-message"></span>
                        </div>
						
						<div class="form-group">
                            <label>Link</label>
                            <input type="text" class="form-control" id="link" name="link" 
                                   required value="${data.link}">
                            <span class="form-message"></span>
                        </div>
						
						<input type="hidden" id="id" name="id" value="${data.id}">
                       `;
			listUser.innerHTML = content;		
        })
        .catch(error => console.error(error));
}

function updateDocument() {
	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get('id');
    var name = document.querySelector('input[name="name"]').value
	var description = document.querySelector('input[name="description"]').value
	var link = document.querySelector('input[name="link"]').value
    var category = {
		"id": id,
        "name": name,
		"description": description,
		"link": link
    };
	
    apiUrl = domain_doc + "/document/" + id;
    fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(category)
        })
        .then(function(response) {
            if (response.ok) {
                alert("Document Update successfully!");
                location.replace("/19.9.2023/templatenew/admin/document/list.html");
            } else {
                alert('Response not OK');
                location.reload();
            }
        })
        .catch(function(error) {
            alert("Error: " + error.message);
        });
}

function driverList() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const apiUrl1 = domain_doc + "/driver-list-folder/" + id;
    const apiUrl2 = domain_doc + "/driver-list-file/" + id;

    Promise.all([
        fetch(apiUrl1, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()),
        fetch(apiUrl2, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
    ])
    .then(([folderData, fileData]) => {
        var listFolder = document.querySelector('#driver-list-folder');
        
        var folderContent = folderData.map(function(item) {
            return `
                <a href="/19.9.2023/templatenew/web/document/driver/my-driver.html?id=${item.id}">
                    <button style="height: 100px; text-align: center; width: 15%; background-color: yellow; margin: 30px; float: left">${item.name}</button>
                </a>
            `;
        });

        var fileContent = fileData.map(function(item) {
            return `
			<a href="/19.9.2023/templatenew/web/document/upl.html?id=${item.link}&id1=${item.thumbnailLink}">
                <button style="height: 150px; text-align: center; width: 15%; background-color: blue; margin: 30px; float: left">
                    <img src="${item.thumbnailLink}" alt="Image" style="width:100% ;height:130px;">
                </button>
			</a>
            `;
        });

        var combinedContent = folderContent.concat(fileContent);

        listFolder.innerHTML = combinedContent.join('');
    })
    .catch(error => console.error(error));
}

function getAllCategoryForm() {
    apiUrl = domain_cate + "/category"
    fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(datas => {
            var listUser = document.querySelector('#listCate')
            var content = datas.map(function(category) {
                return `<option value="${category.id}">${category.name}</option>`;
            });
            listUser.innerHTML = content.join('');
        })
        .catch(error => console.error(error));
}

async function xlUpload() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
	const id1 = urlParams.get('id1');
    var userId = localStorage.getItem("user");
    var name = document.querySelector('input[name="name"]').value;
    var description = document.querySelector('textarea[name="description"]').value;
    var category = document.querySelector('select[name="listCate"]').value;
    var document_id = 0;
    var user = {
        "name": name,
        "description": description,
        "link": id,
		"img": id1
    };

    try {
        apiUrl = domain_doc + "/document";
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            const dataResponse = await fetch(domain_doc + "/getDocument?link=" + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (dataResponse.ok) {
                const data = await dataResponse.json();
                document_id = data.id;

                const uploadResponse = await fetch(domain_doc + "/up-len-kho/" + userId + "/" + document_id + "/" + category, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (uploadResponse.ok) {
				location.replace(`/19.9.2023/templatenew/web/document/khoTaiLieu.html?id=${category}`);
                } else {
                    alert('Response not OK');
                    location.reload();
                }
            } else {
                alert('Response not OK');
                location.reload();
            }
        } else {
            alert('Response not OK');
            location.reload();
        }
    } catch (error) {
        alert("Error: " + error.message);
    }
}

async function getAllDocumentKho() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    apiUrl = domain_doc + "/kho-tai-lieu/" + id;

    const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const datas = await response.json();
		var listUser = document.querySelector('#listDocument123');

        datas.forEach(async function(data) {
            const document_id = data.document_id;
            const user_id = data.user_id;
            const category_id = data.category_id;

            const response1 = await fetch(domain_doc + "/document/" + document_id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const response2 = await fetch(domain + "/user/" + user_id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const response3 = await fetch(domain_cate + "/category/" + category_id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response1.ok && response2.ok && response3.ok) {
                const data1 = await response1.json();
                const data2 = await response2.json();
                const data3 = await response3.json();

                
                var content = `
                    <div class="col-md-6 col-lg-6 col-xl-4">
                        <div class="rounded position-relative fruite-item">
                            <div class="fruite-img text-center">
                                <img src="${data1.img}" class="img-fluid w-30 rounded-top" alt="">
                            </div>
                            <div class="p-4 border border-secondary border-top-0 rounded-bottom">
                                <h5>${data1.name}</h4>
                                <p>Người đăng: ${data2.name}</p>
								<p>Ngày đăng: ${data.date_post}</p>
                                <div class="d-flex justify-content-between flex-lg-wrap">
                                    <p>Thể loại: ${data3.name}</p>
                                    <a href="/19.9.2023/templatenew/web/document/detail.html?id=${data.id}" class="btn border border-secondary rounded-pill px-3 text-primary">Detail</a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                
            }
			
			listUser.innerHTML += content;
        });
    }
}

async function getAllDocumentHome() {
    apiUrl = domain_doc + "/kho-tai-lieu-home";

    const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const datas = await response.json();
		var listUser = document.querySelector('#kho-tai-lieu-home');
		
        datas.forEach(async function(data) {
            const document_id = data.document_id;
            const user_id = data.user_id;
            const category_id = data.category_id;

            const response1 = await fetch(domain_doc + "/document/" + document_id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const response2 = await fetch(domain + "/user/" + user_id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const response3 = await fetch(domain_cate + "/category/" + category_id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response1.ok && response2.ok && response3.ok) {
                const data1 = await response1.json();
                const data2 = await response2.json();
                const data3 = await response3.json();

                
                var content = `
                    <div class="col-md-6 col-lg-6 col-xl-3">
                        <div class="rounded position-relative fruite-item">
                            <div class="fruite-img text-center">
                                <img src="${data1.img}" class="img-fluid w-30 rounded-top" alt="">
                            </div>
                            <div class="p-4 border border-secondary border-top-0 rounded-bottom">
                                <h5>${data1.name}</h4>
                                <p>Người đăng: ${data2.name}</p>
								<p>Ngày đăng: ${data.date_post}</p>
                                <div class="d-flex justify-content-between flex-lg-wrap">
                                    <p>Thể loại: ${data3.name}</p>
                                    <a href="/19.9.2023/templatenew/web/document/detail.html?id=${data.id}" class="btn border border-secondary rounded-pill px-3 text-primary">Detail</a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                
            }
			
			listUser.innerHTML += content;
        });
    }
}

async function getAllDocumentMyPage() {
	var userId = localStorage.getItem("user");
    apiUrl = domain_doc + "/kho-tai-lieu-my-page/" + userId;

    const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const datas = await response.json();
		var listUser = document.querySelector('#kho-tai-lieu-home-my-page');
		
        datas.forEach(async function(data) {
            const document_id = data.document_id;
            const user_id = data.user_id;
            const category_id = data.category_id;

            const response1 = await fetch(domain_doc + "/document/" + document_id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const response2 = await fetch(domain + "/user/" + user_id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const response3 = await fetch(domain_cate + "/category/" + category_id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response1.ok && response2.ok && response3.ok) {
                const data1 = await response1.json();
                const data2 = await response2.json();
                const data3 = await response3.json();

                
                var content = `
                    <div class="col-md-6 col-lg-6 col-xl-3">
                        <div class="rounded position-relative fruite-item">
                            <div class="fruite-img text-center">
                                <img src="${data1.img}" class="img-fluid w-30 rounded-top" alt="">
                            </div>
                            <div class="p-4 border border-secondary border-top-0 rounded-bottom">
                                <h5>${data1.name}</h4>
								<p>Ngày đăng: ${data.date_post}</p>
                                <div class="d-flex justify-content-between flex-lg-wrap">
                                    <p>Thể loại: ${data3.name}</p>
                                    <button onclick="deleteCategoryDocument(${data.id})" class="btn border border-secondary rounded-pill px-3 text-primary">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                
            }
			
			listUser.innerHTML += content;
        });
    }
}

function getCategoryName() {
	const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    apiUrl = domain_cate + "/category/" + id;
    fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            var listUser = document.querySelector('#category_name');
            var content = `<h3>${data.name}</h3>`;
			listUser.innerHTML = content;		
        })
        .catch(error => console.error(error));
}

function getNavListCategory() {
    apiUrl = domain_cate + "/category"
    fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(datas => {
            var listUser = document.querySelector('#navListCategory');
            var content = datas.map(function(category) {
                return `
				<li>
                    <div class="d-flex justify-content-between fruite-name">
					<a href="/19.9.2023/templatenew/web/document/khoTaiLieu.html?id=${category.id}">${category.name}</a>
                </li>
			    `;
            });
            listUser.innerHTML = content.join('');
        })
        .catch(error => console.error(error));
}

function getDocumentDetail() {
	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get('id');
    apiUrl = domain_doc + "/category-document/" + id;
    fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            var listUser = document.querySelector('#detail-document');
            var content = `
			<div class="col-lg-6">
                <div class="border rounded">
                    <a href="#">
                        <img src="${data.img}" class="img-fluid rounded" alt="Image" height="70" width="420">
                    </a>
                </div>
            </div>
            <div class="col-lg-6 mx-5">
				<h4 class="fw-bold mb-3">${data.name}</h4>
                <p class="mb-4">${data.description}</p>
                <a href="${data.link}" class="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary" target="_blank">Download</a>
            </div>
            `;
			listUser.innerHTML = content;		
        })
        .catch(error => console.error(error));
}

function getMyPage() {
	var id = localStorage.getItem("user");
    apiUrl = domain_doc + "/my-page/" + id;
    fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(datas => {
            var listUser = document.querySelector('#abc12344');
            var content = datas.map(function(data) {
                return `
				<div style="background-color: PeachPuff; width: 93%; height: 70px; margin-left: 30px; border-bottom: 1px solid Gray;" >
				  <h5 style="margin-top: 25px; float: left; margin-left: 50px;">${data.name}</h5>
                  <Button onclick="deleteDocumentMyPage(${data.id})" class="btn btn-danger" style="margin-right: 30px; margin-top: 15px; float: right;" onclick="return confirm('Are you sure want to delete it?')">delete</Button> 
                  <a href="${data.link}" type="button" class="btn btn-success" style="margin-right: 30px; margin-top: 15px; float: right;" target="_blank">show</a>
				  </div>
				`;
            });
            listUser.innerHTML = content.join('');
        })
        .catch(error => console.error(error));
}

function deleteDocumentMyPage(id) {
	var user_id = localStorage.getItem("user");
    fetch(domain_doc + '/my-page/delete/' + user_id + '/' + id, {
            method: 'DELETE'
        })
        .then(function(response) {
            if (response.ok) {
                alert("Deleted successfully!");
                location.reload();
            } else {
                throw new Error('Response not OK');
            }
        })
        .catch(function(error) {
            alert("Error: " + error.message);
        });
}

function search() {
	var name = document.querySelector('input[name="search"]').value
    apiUrl = domain_doc + "/search/" + name;
    fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(datas => {
            var listUser = document.querySelector('#search123');
            var content = datas.map(function(data) {
                return `
				 <div style="background-color: PeachPuff; width: 93%; height: 70px; margin-left: 30px; border-bottom: 1px solid Gray;">
                <h5 style="margin-top: 25px; float: left; margin-left: 50px;">${data.name}</h5>
                <a href="/19.9.2023/templatenew/web/document/detail.html?id=${data.id}" type="button" class="btn btn-success" style="margin-right: 30px; margin-top: 15px; float: right;">Detail</a>
                </div>
				`;
            });
            listUser.innerHTML = content.join('');
        })
        .catch(error => console.error(error));
}

async function getAllComment() {
    apiUrl = domain_com + "/comment";

    const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const datas = await response.json();
		var listUser = document.querySelector('#list-comment');
		
        datas.forEach(async function(data) {
            const user_id = data.user_id;

            const response1 = await fetch(domain + "/user/" + user_id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });


            if (response1.ok) {
                const data1 = await response1.json();

                var content = `
                    <div class="d-flex">
                                            <img src="/19.9.2023/templatenew/img/avatar.jpg" class="img-fluid rounded-circle p-3" style="width: 100px; height: 100px;" alt="">
                                            <div class="">
                                                <p class="mb-2" style="font-size: 14px;">${data.date_at}</p>
												<div class="d-flex justify-content-between">
                                                    <h5>${data1.name}</h5>
                                                </div>
                                                <p class="text-dark">${data.description}</p>
                                            </div>
                                        </div>
                `;
                
            }
			
			listUser.innerHTML += content;
        });
    }
}


function addComment() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    var userId = localStorage.getItem("user");
    var review = document.querySelector('textarea[name="review"]').value;

    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1; 
    var year = today.getFullYear();
  
    if (day < 10) {
        day = '0' + day;
    }
  
    if (month < 10) {
        month = '0' + month;
    }
  
    var formattedDate = day + '/' + month + '/' + year;

    var comment = {
        "user_id": userId,
        "catedoc_id": id,
        "description": review,
        "date_at": formattedDate 
    };
	
    var apiUrl = domain_com + "/comment";
    fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        })
        .then(function(response) {
            if (response.ok) {
                alert("Comment posted successfully!");
                location.reload();
            } else {
                alert('Response not OK');
                location.reload();
            }
        })
        .catch(function(error) {
            alert("Error: " + error.message);
        });
}





