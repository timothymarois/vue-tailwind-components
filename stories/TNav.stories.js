export default {
	title: 'Application/TNav'
};

export const DefaultState = () => ({
	template: 
	`
		<t-app>

            <t-nav>
            
                <div>
                    Nav Title
                </div>

                <div class="hidden md:ml-6 md:flex md:space-x-8">
                    <div>link 1</div>
                    <div>link 2</div>
                    <div>link 3</div>
                </div>

            </t-nav>

            <t-page offsetHeight="64">
                <div style="height:2000px">
                    This is my long page content
                    <br>
                    This is my long page content
                    <br>
                    This is my long page content
                    <br>
                    This is my long page content
                    <br>
                    This is my long page content
                </div>
            </t-page>

        </t-app>
	`,
});

export const Example1Light = () => ({
	template: 
	`
		<t-app>

            <t-nav variant="autodark">
            
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <img class="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow">
                    </div>
                    <div class="hidden md:block">
                        <div class="ml-10 flex items-baseline space-x-4">
                            <a href="#" class="bg-gray-200 dark:bg-gray-900 dark:text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Dashboard</a>
            
                            <a href="#" class="dark:text-gray-300 hover:bg-gray-100 hover:dark:bg-gray-700 hover:dark:text-white px-3 py-2 rounded-md text-sm font-medium">Team</a>
            
                            <a href="#" class="dark:text-gray-300 hover:bg-gray-100 hover:dark:bg-gray-700 hover:dark:text-white px-3 py-2 rounded-md text-sm font-medium">Projects</a>
            
                            <a href="#" class="dark:text-gray-300 hover:bg-gray-100 hover:dark:bg-gray-700 hover:dark:text-white px-3 py-2 rounded-md text-sm font-medium">Calendar</a>
            
                            <a href="#" class="dark:text-gray-300 hover:bg-gray-100 hover:dark:bg-gray-700 hover:dark:text-white px-3 py-2 rounded-md text-sm font-medium">Reports</a>
                        </div>
                    </div>
                </div>

            </t-nav>

            <t-page offsetHeight="64">
                <div style="height:2000px">
                    This is my long page content
                    <br>
                    This is my long page content
                    <br>
                    This is my long page content
                    <br>
                    This is my long page content
                    <br>
                    This is my long page content
                </div>
            </t-page>

        </t-app>
	`,
});

export const Example1Dark = () => ({
	template: 
	`
		<t-app dark>

            <t-nav variant="autodark">
            
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <img class="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow">
                    </div>
                    <div class="hidden md:block">
                        <div class="ml-10 flex items-baseline space-x-4">
                            <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                            <a href="#" class="bg-gray-200 dark:bg-gray-900 dark:text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Dashboard</a>
            
                            <a href="#" class="dark:text-gray-300 hover:bg-gray-100 hover:dark:bg-gray-700 hover:dark:text-white px-3 py-2 rounded-md text-sm font-medium">Team</a>
            
                            <a href="#" class="dark:text-gray-300 hover:bg-gray-100 hover:dark:bg-gray-700 hover:dark:text-white px-3 py-2 rounded-md text-sm font-medium">Projects</a>
            
                            <a href="#" class="dark:text-gray-300 hover:bg-gray-100 hover:dark:bg-gray-700 hover:dark:text-white px-3 py-2 rounded-md text-sm font-medium">Calendar</a>
            
                            <a href="#" class="dark:text-gray-300 hover:bg-gray-100 hover:dark:bg-gray-700 hover:dark:text-white px-3 py-2 rounded-md text-sm font-medium">Reports</a>
                        </div>
                    </div>
                </div>

            </t-nav>

            <t-page offsetHeight="64">
                <div style="height:2000px">
                    This is my long page content
                    <br>
                    This is my long page content
                    <br>
                    This is my long page content
                    <br>
                    This is my long page content
                    <br>
                    This is my long page content
                </div>
            </t-page>

        </t-app>
	`,
});

// export const DarkModeOnState = () => ({
// 	template: 
// 	`
// 		<t-app dark>
//             this is my app with dark mode on
//         </t-app>
// 	`,
// });


// export const AutoDarkModeState = () => ({
// 	template: 
// 	`
// 		<t-app autoDarkMode>
//             this is my app with auto dark mode on
//         </t-app>
// 	`,
// });
