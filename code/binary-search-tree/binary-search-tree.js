/*
 * 二叉搜索树的性质:每个结点左子树中的结点都不大于当前结点，右子树中的结点都不小于当前结点
 * */

let Node=function(key){
	this.key=key;
	this.left=null;
	this.right=null;
	this.p=null;
}

let Tree=function(){
	this.root=null;
}

/*
 * 中序遍历树
 */

function inorderTreeWalk(n){
	if(n!=null){
		inorderTreeWalk(n.left);
		console.log(n.key);
		inorderTreeWalk(n.right);
	}
}


/*查找关键字为k的结点,x为树的根结点*/

function treeSearch(x,k){
	while(x!=null&&x.key!=k){
		if(k<x.key){
			x=x.left;
		}else{
			x=x.right;
		}
	}
	return x;
}

/*查找树的最小值*/

function treeMinMum(tree){
	let min=tree.root;
	let x=min.left;
	while(x!=null){
		min=x;
		x=x.left;
	}
	return min;
}

/*查找树的最大值*/

function treeMaxMum(tree){
	let max=tree.root;
	let x=max.right;
	while(x!=null){
		max=x;
		x=x.right;
	}
	return max;
}

/*
 * 查找一个结点的后继
 *一个结点的后继是大于x.key的最小关键字的结点
 * */

function treeSuccessor(x){
	if(x.right!=null){
		return treeMinMum(x.right);
	}
	y=x.p;
	while(y!=null&&x==y.right){
		x=y;
		y=y.p;
	}
	return y;
}

/*
 * 查找一个结点的前驱
 * */

function treePredecessor(x){
	if(x.left!=null){
		return treeMinMum(x.left);
	}
	y=x.p;
	while(y!=null&&x==y.left){
		x=y;
		y=y.p;
	}
	return y;
}

/*插入操作*/

function treeInsert(tree,n){
	let p=null,x=tree.root;
	while(x){
		p=x;
		if(n.key<p.key){
			x=x.left;
		}else{
			x=x.right;
		}
	}
	n.p=p;
	if(p==null){
		tree.root=n;
	}else if(n.key<p.key){
		p.left=n;
	}else{
		p.right=n;
	}	
}

/*删除操作
 * 删除操作的难点在于:当要删除的点（设为x）拥有两个孩子的时候的删除操作。此时需要将删除的点替换为右孩子中最小的点，替换顺序如下:
 * 1. 找出右孩子中最小的点y，这时y一定没有左孩子。
 * 2. 若y的双亲为要删除的点x,则将y直接移植到x处
 * 3. 若y的双亲不为x，假设为k,则需要把y的右孩子移植在y的地方，把y单拎出来，然后把要删除元素的右孩子变为y的右孩子。再将y移植到x处。
 * 4. 把y移植到x处时别忘了把y的左孩子设置为x的左孩子
 * */

function transplant(tree,u,v){
	if(u.p==null){
		tree.root=v;
	}else if(u==u.p.left){
		u.p.left=v;
	}else{
		u.p.right=v;
	}
	if(v!=null){
		v.p=u.p;
	}
}

function treeDelete(tree,n){
	if(n.left==null){
		transplant(tree,n,n.right);
	}else if(n.right=null){
		transplant(tree,n,n.left);
	}else{
		y=treeMinMum(n.right);
		if(y.p!=n){
			transplant(tree,y,y.right);
			y.right=n.right;
			y.right.p=y;
		}
		transplant(tree,n,y);
		y.left=n.left;
		y.left.p=y;
	}	
}




/*测试-----*/

let tree=new Tree();
treeInsert(tree,new Node(5));
treeInsert(tree,new Node(8));
treeInsert(tree,new Node(2));
treeInsert(tree,new Node(4));
treeInsert(tree,new Node(9));
treeInsert(tree,new Node(15));

inorderTreeWalk(tree.root);//2，4，5，8，9，15

let searchN=treeSearch(tree.root,4);
console.log(searchN);

let n=new Node(10);
treeInsert(tree,n);

let pre=treePredecessor(n)//查找n的前驱
console.log(pre);

inorderTreeWalk(tree.root);//2，4，5，8，9，10，15

treeDelete(tree,n)
inorderTreeWalk(tree.root);//2，4，5，8，9，15

let max=treeMaxMum(tree);
console.log(max.key);//15


