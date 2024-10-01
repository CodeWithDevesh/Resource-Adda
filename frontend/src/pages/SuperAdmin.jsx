import React from 'react'
import "./SuperAdmin.css"

export default function SuperAdmin() {
  return (
    <div>
      <div class="home">
        <div class="container">
            <div class="section-1">
                
                <div>
                    <label for="superadmin-password" class="text">Super Admin Password</label>
                    <div class="input-container">
                        <input type="password" id="superadmin-password" class="admin-input" placeholder="Enter Super Admin Password"/>
                        <span class="toggle-password">
                            <i class="fas fa-eye"></i>
                        </span>
                    </div>
                </div>

               
                <div>
                    <label for="admin-username" class="text">Admin Username</label>
                    <input type="text" id="admin-username" class="admin-input" placeholder="Enter Admin Username"/>
                </div>

                
                <div>
                    <label for="admin-password" class="text">Admin Password</label>
                    <div class="input-container">
                        <input type="password" id="admin-password" class="admin-input" placeholder="Enter Admin Password"/>
                        <span class="toggle-password">
                            <i class="fas fa-eye"></i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
      
    </div>
  )
}
