// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import active from "./handle/index";
import {buildUi,buildDetail,buildList} from "./handle/ui";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.haveFun', () => {
		// The code you place here will be executed every time your command is executed
		let panel=vscode.window.createWebviewPanel("haveFun","haveFun",vscode.ViewColumn.One,{enableScripts: true});
		panel.webview.html="初始化加载中....";
		active.search().then((result:Array<any>)=>{
			panel.webview.html=buildUi(result);
		});
		let html="";
		panel.webview.onDidReceiveMessage((message:any)=>{

			switch (message.type){
				case "jump" : active.toDetail(message.id)
								.then(res=>{
									html=panel.webview.html;
									panel.webview.html=buildDetail(res);
								});
							break;
				case "next" : active.search(message.page)
								.then((result:Array<any>)=>panel.webview.postMessage(buildList(result)));
							break;
				case "back" : panel.webview.html=html;
			}
			
		});
		
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
